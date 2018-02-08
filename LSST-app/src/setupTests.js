global.requestAnimationFrame = function(callback) {
    setTimeout(callback, 0);
};

// console.log = function() {} //Uncomment to remove logs from test results