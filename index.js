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
            required: true,
            lowercase: true,
            trim: true
        },
        author: String,
        tags: {
            type: Array,
            validate: {
                isAsync: true,
                validator: function (v, cb) {
                    setTimeout(() => {
                        //Do some async work
                        cb(v && v.length > 0)
                    }, 4000)
                },
                message: 'There should be at least one tag'
            }
        },
        date: { type: Date, default: Date.now },
        isPublished: Boolean,
        price: { //Price is required only if the book is published.
            type: Number,
            required: function () { return this.isPublished }, //Cannot use arrow function here , because arrow functions have lexical scope.
            min: 100,
            max: 200,
            get: v => Match.round(v),
            set: v => Math.round(v) //Custom getter and setter
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