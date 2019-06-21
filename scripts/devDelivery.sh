#!/usr/bin/env bash
echo "Publish Priem has started"
rm -rf /home/developer/server/www/priem/priem/owl/*.*
echo 'Delete successed'
cp -r ./build/* /home/developer/server/www/priem/owl/
echo "Copy successed"
echo "Publish Priem has finished"