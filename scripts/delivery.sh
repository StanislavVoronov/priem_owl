echo "Publish Priem has started"
rm -rf /home/developer/server/www/priem/unstable/priem_owl/*.*
echo 'Delete successed'
cp -r ../build/* /home/developer/server/www/priem/unstable/priem_owl/
echo "Copy successed"
echo "Publish Priem has finished"