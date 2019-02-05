const sleep = function sleep(ms, cb) {
    console.log('sleep start');
    const start = new Date().getTime();
    let now = start;

    while (now - start < ms) {
        now = new Date().getTime();
    }

    if (cb) cb();
    console.log('sleep end');
};

export default sleep;
