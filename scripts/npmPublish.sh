cd ..
rm -rf ./build/dist
npm run tsc
npm version patch -m "Upgrade to %s for reasons"
cp -rf ./.package.json ./build/dist/package.json
cd ./build/dist/
npm version patch -m "Upgrade to %s for reasons"
npm publish
cp -rf ./package.json ../../.package.json
git add --all
git commit -m 'Update and publish package'
git push