const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log("Could not connect to mongodb"));

/*jshint ignore:start*/
(async () => {
    const courseSchema = {
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 15
        },
        category: {
            type: String,
            enum: ['FE', 'PE', 'Mobile'],
            required: true
        },
        author: String,
        tags: [String],
        date: { type: Date, default: Date.now },
        isPublished: Boolean,
        price: { //Price is required only if the book is published.
            type: Number,
            required: function () { return this.isPublished },
            min: 100,
            max: 200
            //Cannot use arrow function here , because arrow functions have lexical scope.
        }
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

    const courses = await Course.find();
    // console.log(courses);

    const courses1 = await Course
        // .find({ author: 'Vinoth' })
        // .find({ price: { $gt :10 , $lt: 20 }})
        // .find( { price : {$in : [10,20,30]}}) //Comparison operator
        .find()
        .or([{ author: 'Vinoth' }, { isPublished: true }]) //Logical or operator
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1 }) // Just output name field - don't get everything

    console.log(courses1);
})();