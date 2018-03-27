# copies all directories and files except those excluded in exclude.txt.
src="./www/"
dest="./dist/"
exclude="./exclude.txt"
rsync -avz --exclude-from $exclude $src $dest
cp package.json $dest
