#!/usr/bin/env node

const { spawn } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');

// 监听的文件路径
const watchPath = path.join(__dirname, '../src/learning/reactivity/effect.ts');
const testPath = path.join(__dirname, '../src/tests/reactivity/effect.test.ts');

console.log('🔍 开始监听 effect.ts 文件变化...');
console.log(`📁 监听路径: ${watchPath}`);
console.log(`🧪 测试文件: ${testPath}`);
console.log('按 Ctrl+C 停止监听\n');

let testProcess = null;

// 执行测试的函数
function runTest() {
  // 如果已有测试进程在运行，先终止它
  if (testProcess) {
    testProcess.kill();
  }

  console.log('🧪 执行测试...');

  testProcess = spawn('npm', ['test', 'src/tests/reactivity/effect.test.ts'], {
    stdio: 'inherit',
    shell: true
  });

  testProcess.on('close', (code) => {
    console.log(`\n✅ 测试完成，退出码: ${code}`);
    testProcess = null;
  });

  testProcess.on('error', (error) => {
    console.error('❌ 测试执行错误:', error);
    testProcess = null;
  });
}

// 监听文件变化
const watcher = chokidar.watch(watchPath, {
  persistent: true,
  ignoreInitial: false
});

watcher.on('change', (filePath) => {
  console.log(`\n📝 文件变化: ${filePath}`);
  runTest();
});

watcher.on('error', (error) => {
  console.error('❌ 监听错误:', error);
});

// 处理进程退出
process.on('SIGINT', () => {
  console.log('\n🛑 停止监听...');
  if (testProcess) {
    testProcess.kill();
  }
  watcher.close();
  process.exit(0);
});

// 初始执行一次测试
runTest();
