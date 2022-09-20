## ダウンロード方法

git clone https://github.com/uiternia/theater_reserve.git

##　インストール方法

- cd クローンしたプロジェクト

- cp .env.example .env

.envファイルの下記の部分の変更
- APP_URL=http://localhost
- DB_HOST=mysql
- DB_USERNAME=root
- DB_PASSWORD=pass
- MEMCACHED_HOST=memcached
- REDIS_HOST=redis
- MAIL_MAILER=smtp
- MAIL_HOST=mailhog
- MAIL_PORT=1025
- MAIL_USERNAME=null
- MAIL_PASSWORD=null
- MAIL_ENCRYPTION=null
- MAIL_FROM_ADDRESS=admin@admin.com
- MAIL_FROM_NAME="${APP_NAME}"
- QUEUE_CONNECTION=database

vendor ディレクトリはリポジトリに含まれていないので、パッケージをインストールします。手元のPCにPHPやComposerがインストールされていればそれを利用することもできますが、ここでは、Laravel Sailのセットアップスクリプトでも利用されているDockerイメージを利用してインストールします。
以下の順でコマンドの実行をお願いします。

- docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs
- ./vendor/bin/sail up -d

- ./vendor/bin/sail artisan key:generate

- ./vendor/bin/sail npm install

- ./vendor/bin/sail npm run dev

- ./vendor/bin/sail artisan migrate:fresh --seed

- ./vendor/bin/sail php artisan storage:link

- public/images内の3点の画像をそれぞれ storage/app/public/images内に配置をお願いします。

##　動作確認
- http://localhost/  -> アプリ

- http://localhost:8025/  -> MailHog

- http://localhost:8080/  ->phpMyAdmin(データベース) ユーザー:root パスワード:pass

## 補足
- 現在は/admin/login でのログイン後ページのみ実装しております。
- 予約及びイベントのseedは2023/9/05〜2023/9/12で設定しております。
売上管理をご確認の際、イベント及びそのイベントの予約を入れていない場合はそちらの日付でご確認お願いいたします。
- 現在売上管理等の都合上seedまた新規予約での来場ステータスをtrueにしていますが,本来はデフォルトはfalseに設定し来場したお客様に対して当日の予約管理システムにてtrueに変更をかける想定です。
- 新規予約,予約情報更新,予約キャンセルの機能に関してそれぞれメール機能の実装をしています。
またメール処理には時間がかかるので、 キューを使用しています。
./vendor/bin/sail artisan queue:workで ワーカーを立ち上げを動作確認お願いします。
- モバイルファーストで作成しているためグラフとか小さいです、、いずれ修正します、、
