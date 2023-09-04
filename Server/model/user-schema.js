const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    Email: String,
    fullName: String,
    age: Number,
    educationLevel: String,
    instituteOfEducation: String,
    fieldOfStudy: String,
    workExperience: String,
    instituteInCanada: String,
    programInCanada: String,
    applyingCountry: String,
    futureGoals: String,
    englishListeningScore: Number,
    englishReadingScore: Number,
    englishSpeakingScore: Number,
    englishWritingScore: Number,
    firstYearTuitionPaid: String,
    tuitionFeePaid: Number,
    gicPaid: String,
    gicAmountPaid: Number

})

const User = mongoose.model('User', userSchema);

module.exports = User;
       