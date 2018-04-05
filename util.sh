# copies all directories and files except those excluded in exclude.txt.
copy () {
    src="./www/"
    dest="./dist/"
    exclude="./exclude.txt"
    rsync -avz --exclude-from $exclude $src $dest
    cp package.json $dest
    rsync -avz --exclude-from $exclude "./lib" $dest
}

# runs sass on all existing .sass files in the www/styles directory.
compile () {
    files=( $(find ./www/styles -name "*.sass") )
    for file in "${files[@]}";
    do
        sass $file ${file/.sass/.css} 
    done
}

if [ "$1" == "copy" ]
then
    echo "Copying."
    copy
elif [ "$1" == "sass" ]
then
    echo "Compiling .sass files."
    compile
else
    echo "No arguments provided."
fi