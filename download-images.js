// 圖片下載腳本
// 使用方法: node download-images.js

const https = require('https');
const fs = require('fs');
const path = require('path');

// 圖片資源配置
const images = [
  {
    url: 'https://images.unsplash.com/photo-1606115915090-be18fea23ec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    filename: 'founder-story.jpg',
    description: '創辦人研發過程',
  },
  {
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    filename: 'founder.jpg',
    description: '創辦人照片',
  },
  {
    url: 'https://images.unsplash.com/photo-1494790108755-2616c56f0c95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    filename: 'cto.jpg',
    description: '技術總監照片',
  },
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    filename: 'marketing.jpg',
    description: '行銷總監照片',
  },
  {
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    filename: 'customer1.jpg',
    description: '客戶1照片',
  },
  {
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    filename: 'customer2.jpg',
    description: '客戶2照片',
  },
];

// 確保 images 目錄存在
const imagesDir = path.join(__dirname, 'src', 'assets', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('✅ 創建 images 目錄');
}

// 下載單個圖片的函數
function downloadImage(imageConfig) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, imageConfig.filename);

    // 檢查檔案是否已存在
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  ${imageConfig.filename} 已存在，跳過下載`);
      resolve();
      return;
    }

    console.log(
      `📥 開始下載: ${imageConfig.description} (${imageConfig.filename})`
    );

    const file = fs.createWriteStream(filePath);

    https
      .get(imageConfig.url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(
              `下載失敗: ${response.statusCode} ${response.statusMessage}`
            )
          );
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.log(`✅ 下載完成: ${imageConfig.filename}`);
          resolve();
        });
      })
      .on('error', (err) => {
        fs.unlink(filePath, () => {}); // 刪除部分下載的檔案
        reject(err);
      });
  });
}

// 主執行函數
function downloadAllImages() {
  console.log('🚀 開始下載圖片資源...\n');

  // 使用 Promise.all 替代 for...of 迴圈
  const downloadPromises = images.map((imageConfig) =>
    downloadImage(imageConfig)
  );

  Promise.all(downloadPromises)
    .then(() => {
      console.log('\n🎉 所有圖片下載完成！');
      console.log('\n📝 下載的檔案列表:');
      images.forEach((img) => {
        console.log(`   - ${img.filename} (${img.description})`);
      });

      console.log(
        '\n💡 提示: 您可以將這些圖片複製到 src/assets/images/ 目錄中'
      );
      console.log('   然後修改 Vue 組件中的圖片路徑使用本地圖片');
    })
    .catch((error) => {
      console.error('❌ 下載過程中發生錯誤:', error.message);
    });
}

// 執行下載
downloadAllImages();

console.log('\n📚 圖片來源聲明:');
console.log('所有圖片均來自 Unsplash (https://unsplash.com)');
console.log('根據 Unsplash License 可免費使用於商業用途');
console.log('攝影師資訊可在 Unsplash 網站上查看');
