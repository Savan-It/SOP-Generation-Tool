import * as Yup from 'yup';


export const validationSchema = Yup.object().shape({
    Email: Yup.string().email().required('Email is required'),
    fullName: Yup.string().min(3).required('Full Name is required'),
    age: Yup.number().min(18).max(55).required('Age is required'),
    educationLevel: Yup.string().required('Education Level is required'),
    instituteOfEducation: Yup.string().required('Institute is required'),
    fieldOfStudy: Yup.string().required('Field of Study is required'),
    workExperience: Yup.string().required('work experiance is required'),
    instituteInCanada: Yup.string().required('Institute name is required'),
    programInCanada: Yup.string().required('Program name is required'),
    applyingCountry: Yup.string().required('Applying Country is required'),
    futureGoals: Yup.string().required('Future Goals is required'),
    englishListeningScore: Yup.number().min(0.1).max(9).required('Listening Score is required'),
    englishReadingScore: Yup.number().min(0.1).max(9).required('Reading Score is required'),
    englishSpeakingScore: Yup.number().min(0.1).max(9).required('Speaking Score is required'),
    englishWritingScore: Yup.number().min(0.1).max(9).required('Writing Score is required'),
    firstYearTuitionPaid: Yup.string().required('This field is required'),
    tuitionFeePaid: Yup.number().required('Is required'),
    gicPaid: Yup.string().required('This field is required'),
    gicAmountPaid: Yup.number().required('GIC amount is required'),
  });