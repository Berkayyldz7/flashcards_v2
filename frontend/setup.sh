#!/bin/bash

set -e  # Hata olursa script durur

echo "🚀 Başlatılıyor: Ubuntu React + Nginx Geliştirme Ortamı Kurulumu"

# 1. Sistem güncellemeleri
echo "📦 Sistem güncelleniyor..."
sudo apt update && sudo apt upgrade -y

# 2. Temel araçlar
echo "🛠️ Temel araçlar kuruluyor..."
sudo apt install -y curl git build-essential

# 3. NodeSource üzerinden Node.js LTS kurulumu
echo "🟢 Node.js LTS kuruluyor..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# # 4. Yarn (isteğe bağlı)
# echo "📦 Yarn kuruluyor (isteğe bağlı)..."
# sudo npm install -g yarn

# 5. Nginx kurulumu
echo "🌐 Nginx kuruluyor..."
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# 6. UFW ile port açma
echo "🔐 Güvenlik duvarı ayarlanıyor..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# # 7. Proje dizini hazırlığı
# echo "📁 Proje dizini oluşturuluyor..."
# mkdir -p ~/projects
# cd ~/projects

# 8. React projesi oluşturulabilir (isteğe bağlı)
# echo "🧱 React projesi oluşturuluyor..."
# npx create-react-app my-app
# cd my-app
# npm start &

# 9. Versiyon kontrolleri
echo ""
echo "✅ Kurulum tamamlandı!"
echo "🔧 Sürümler:"
node -v
npm -v
yarn -v
nginx -v

echo ""
echo "🌍 Sunucu IP adresin:"
curl -s ifconfig.me

echo ""
echo "🚀 Hazırsın! React projesi oluşturmak için şunu kullan:"
echo "  cd ~/projects && npx create-react-app my-app"
