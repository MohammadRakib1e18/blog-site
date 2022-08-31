// To Add New Post, run this file.

let newPost = {
    id: undefined,
    title: "Leetcode - Get prepared for your next Coding Interview",
    img: "https://static.toiimg.com/photo/67382132.cms",
    details:
        "Letcode is one of the best problem-solving site. If you want to make yourself prepared for your next coding interview, <a href='https://leetcode.com/' class='text-info'>leetcode</a> is for you.",
    tag: "IT-World",
    date: "Sep 01, 2022",
    comments: 56,
};

// update the json file
const fs = require("fs");

fs.readFile("./postInfoData.JSON", "utf8", (err, postList) => {
    if (err) {
        console.error(err);
        return;
    }
    postList = JSON.parse(postList);

    let len = postList.length;
    newPost.id = postList[len - 1].id + 1;
    postList.push(newPost);
    len++;

    let uniquePostList = getUniquePost(postList, len);
    uniquePostList = JSON.stringify(uniquePostList);

    fs.writeFile("./postInfoData.JSON", uniquePostList, (err) => {
        if (err) {
            console.error(err);
        }
    });
});

// check if arrat file has any duplicate post
let getUniquePost = (postList, len) => {
    
    let uniquePostList = [];

    for (let i = 0; i < len; i++) {
        if (i) {
            if (postList[i - 1].id >= postList[i].id) {
                // skip this post
                continue;
            }
            let found = false;
            for (let post of uniquePostList) {
                if((postList[i].title === post.title)||(postList[i].details === post.details)) {
                    found = true;
                    console.log("found!");
                    break;
                }
            }
            if (found) continue;
        }
        uniquePostList.push(postList[i]);
    }

    return uniquePostList;
};
