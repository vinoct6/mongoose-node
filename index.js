const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log("Could not connect to mongodb"));

/*jshint ignore:start*/
(async () => {
    const courseSchema = {
        name: String,
        author: String,
        tags: [String],
        date: { type: Date, default: Date.now },
        isPublished: Boolean
    };

    const Course = mongoose.model("courses", courseSchema);

    /*const nodeCourse = new Course({
        name: 'Angular.js',
        author: 'Vinoth',
        tags: ['node', 'backend'],
        isPublished: false
    }); */

    //const result = await nodeCourse.save();
    //console.log(result);

    let courses = await Course.find();
    console.log(courses);
})();




