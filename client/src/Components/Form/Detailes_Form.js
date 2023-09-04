
import {React, useState} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validationSchema } from '../../Schemas/Yup.js';
import axios from 'axios';
import './Detailes_Form.css';

function Detailes_Form() {

  const initialValues = {
    Email: '',
    fullName: '',
    age: '',
    educationLevel: '',
    instituteOfEducation: '',
    fieldOfStudy: '',
    workExperience: '',
    instituteInCanada: '',
    programInCanada: '',
    applyingCountry: '',
    futureGoals: '',
    englishListeningScore: '',
    englishReadingScore: '',
    englishSpeakingScore: '',
    englishWritingScore: '',
    firstYearTuitionPaid: '',
    tuitionFeePaid: '',
    gicPaid: '',
    gicAmountPaid: '',
  };

  //create useStae for sopGenerated or not
  const [sopGenerated, setSopGenerated] = useState(true);

  // Handle form submission here
  const handleSubmit = async (values, { resetForm }) => {

    //create prompt for openai
    const prompt =
      `name is ${values.fullName} and email is ${values.Email},age is ${values.age}, education level is ${values.educationLevel},there institute of education name is ${values.instituteOfEducation}, what they studied is ${values.fieldOfStudy}, work experience is ${values.workExperience},institute in canada is ${values.instituteInCanada}, program in canada is ${values.programInCanada},which country they are applying from is ${values.applyingCountry},future goals are ${values.futureGoals},english score in listening is ${values.englishListeningScore}, reading is ${values.englishReadingScore}, speaking is ${values.englishSpeakingScore}, writing is ${values.englishWritingScore},their first year tuition fee status is ${values.firstYearTuitionPaid} , they paid ${values.tuitionFeePaid} CAD towards tuition fee,giC status is ${values.gicPaid}, they paid ${values.gicAmountPaid} CAD towards GIC. Using this student information, give me Statement of Purpose for study visa to canada `

    try {
      //post request to server to get the response from openai
      const response1 = await axios.post('http://localhost:8000/chat', { prompt });

      //post request to server to generate the pdf
      await axios.post('http://localhost:8000/createPdf', { sopContent: response1.data, userdata: values });

      //post request to send the pdf to mail
      await axios.post('http://localhost:8000/sendPdf', { email: values.Email, fullname: values.fullName });
      

      //alert the response
      setSopGenerated(false)

      //send data to database
      const database = await axios.post('http://localhost:8000/database', { values });
      console.log(database.data);

    } catch (error) {
      console.error(error.message);
    }
    resetForm();
  };

  return (
    <div className="home">
      { sopGenerated ? <div className="form-container">
        <p className="heading">Customized SOP Generator</p>
        <p className="sub-heading">
          Fill out this questionnaire for the student. After submitting, you will receive an email at the email address that you have provided with a Statement of Purpose customized for you. You can use and modify that as per your needs.
        </p>
        <p className="sub-heading">
          If you would like to get it edited, reviewed, or drafted by our experts, you can get in touch with us: <a href="https://effizient-immigration-inc.square.site/s/shop" target="_blank" rel="noopener noreferrer">https://effizient-immigration-inc.square.site/s/shop</a>
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              {/* Email */}
              <div className="form-group">
                <label htmlFor="Email">Email</label>
                <Field
                  type="text"
                  id="Email"
                  name="Email"
                  className={`form-control ${errors.Email && touched.Email ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="Email" component="div" className="invalid-feedback" />
              </div>

              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`form-control ${errors.fullName && touched.fullName ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="fullName" component="div" className="invalid-feedback" />
              </div>

              {/* Age */}
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <Field
                  type="text"
                  id="age"
                  name="age"
                  className={`form-control ${errors.age && touched.age ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="age" component="div" className="invalid-feedback" />
              </div>

              {/* Education Level */}
              <div className="form-group">
                <label htmlFor="educationLevel">Highest Level of Education</label>
                <Field
                  type='select'
                  as="select"
                  id="educationLevel"
                  name="educationLevel"
                  className={`form-control ${errors.educationLevel && touched.educationLevel ? 'is-invalid' : ''}`}
                >
                  <option value="">Select</option>
                  <option value="Grade 12">Grade 12</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelors Degree">Bachelors Degree</option>
                  <option value="Masters Degree">Masters Degree</option>
                  <option value="PhD">PhD</option>
                </Field>
                <ErrorMessage name="educationLevel" component="div" className="invalid-feedback" />
              </div>

              {/* Institute of Education */}
              <div className="form-group">
                <label htmlFor="instituteOfEducation">Institute of Education</label>
                <Field
                  type="text"
                  id="instituteOfEducation"
                  name="instituteOfEducation"
                  className={`form-control ${errors.instituteOfEducation && touched.instituteOfEducation ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="instituteOfEducation" component="div" className="invalid-feedback" />
              </div>

              {/* Field of Study */}
              <div className="form-group">
                <label htmlFor="fieldOfStudy">What did you study</label>
                <Field
                  type="text"
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  className={`form-control ${errors.fieldOfStudy && touched.fieldOfStudy ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="fieldOfStudy" component="div" className="invalid-feedback" />
              </div>

              {/* Work Experience */}
              <div className="form-group">
                <label htmlFor="workExperience">Do you have any relevant work experience?</label>
                <p className="sub-heading">
                  Write None if no work experience. Provide the following details if yes:
                </p>
                <ol className="decimalType">
                  <li>Job Title</li>
                  <li>Company Name</li>
                  <li>Job duties</li>
                </ol>
                <p className="sub-heading">
                  Sample Answer: I worked as a Sales Manager at Effizient Immigration Inc from Jan 2022 till Feb 2023. In this role, I managed sales operations, reaching out to leads, lead the outreach program, ensured meeting monthly targets.
                </p>
                <Field
                  type="text"
                  id="workExperience"
                  name="workExperience"
                  className={`form-control ${errors.workExperience && touched.workExperience ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="workExperience" component="div" className="invalid-feedback" />
              </div>

              {/* Institute in Canada */}
              <div className="form-group">
                <label htmlFor="instituteInCanada">What institute did you get admitted to in Canada?</label>
                <Field
                  type="text"
                  id="instituteInCanada"
                  name="instituteInCanada"
                  className={`form-control ${errors.instituteInCanada && touched.instituteInCanada ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="instituteInCanada" component="div" className="invalid-feedback" />
              </div>

              {/* Program in Canada */}
              <div className="form-group">
                <label htmlFor="programInCanada">What is your program of study in Canada?</label>
                <Field
                  type="text"
                  id="programInCanada"
                  name="programInCanada"
                  className={`form-control ${errors.programInCanada && touched.programInCanada ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="programInCanada" component="div" className="invalid-feedback" />
              </div>

              {/* Applying Country */}
              <div className="form-group">
                <label htmlFor="applyingCountry">Which country are you applying from?</label>
                <Field
                  type="text"
                  id="applyingCountry"
                  name="applyingCountry"
                  className={`form-control ${errors.applyingCountry && touched.applyingCountry ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="applyingCountry" component="div" className="invalid-feedback" />
              </div>

              {/* Future Goals */}
              <div className="form-group">
                <label htmlFor="futureGoals">What are your future goals?</label>
                <Field
                  type="text"
                  id="futureGoals"
                  name="futureGoals"
                  className={`form-control ${errors.futureGoals && touched.futureGoals ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="futureGoals" component="div" className="invalid-feedback" />
              </div>

              {/* English Scores */}
              <div className="form-group">
                <label>English Scores</label>
                <div className="row">
                  <div className="col">
                    <Field
                      type="text"
                      name="englishListeningScore"
                      placeholder="Listening"
                      className={`form-control ${errors.englishListeningScore && touched.englishListeningScore ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="englishListeningScore" component="div" className="invalid-feedback" />
                  </div>
                  <div className="col">
                    <Field
                      type="text"
                      name="englishReadingScore"
                      placeholder="Reading"
                      className={`form-control ${errors.englishReadingScore && touched.englishReadingScore ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="englishReadingScore" component="div" className="invalid-feedback" />
                  </div>
                  <div className="col">
                    <Field
                      type="text"
                      name="englishSpeakingScore"
                      placeholder="Speaking"
                      className={`form-control ${errors.englishSpeakingScore && touched.englishSpeakingScore ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="englishSpeakingScore" component="div" className="invalid-feedback" />
                  </div>
                  <div className="col">
                    <Field
                      type="text"
                      name="englishWritingScore"
                      placeholder="Writing"
                      className={`form-control ${errors.englishWritingScore && touched.englishWritingScore ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="englishWritingScore" component="div" className="invalid-feedback" />
                  </div>
                </div>
              </div>

              {/* First Year Tuition Paid */}
              <div className="form-group">
                <label>Did you pay your first-year tuition?</label>
                <div className="radio-group">
                  <div className="form-check form-check-inline">
                    <label htmlFor="tuitionPaidYes" className="form-check-label">
                      <Field
                        type="radio"
                        id="tuitionPaidYes"
                        name="firstYearTuitionPaid"
                        value="yes"
                        className={`form-check-input ${errors.firstYearTuitionPaid && touched.firstYearTuitionPaid ? 'is-invalid' : ''}`}
                      />
                      Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label htmlFor="tuitionPaidNo" className="form-check-label">
                      <Field
                        type="radio"
                        id="tuitionPaidNo"
                        name="firstYearTuitionPaid"
                        value="no"
                        className={`form-check-input ${errors.firstYearTuitionPaid && touched.firstYearTuitionPaid ? 'is-invalid' : ''}`}
                      />
                      No</label>
                  </div>
                </div>
                <ErrorMessage name="firstYearTuitionPaid" component="div" className="invalid-feedback" />
              </div>

              {/* Tuition Fee Paid */}
              <div className="form-group">
                <label htmlFor="tuitionFeePaid">How much tuition fee did you pay?</label>
                <Field
                  type="text"
                  id="tuitionFeePaid"
                  name="tuitionFeePaid"
                  className={`form-control ${errors.tuitionFeePaid && touched.tuitionFeePaid ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="tuitionFeePaid" component="div" className="invalid-feedback" />
              </div>

              {/* GIC Paid */}
              <div className="form-group">
                <label>Did you do a GIC?</label>
                <div className="radio-group">
                  <div className="form-check form-check-inline">
                    <label htmlFor="gicPaidYes" className="form-check-label">
                      <Field
                        type="radio"
                        id="gicPaidYes"
                        name="gicPaid"
                        value="yes"
                        className={`form-check-input ${errors.gicPaid && touched.gicPaid ? 'is-invalid' : ''}`}
                      />
                      Yes
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label htmlFor="gicPaidNo" className="form-check-label">
                      <Field
                        type="radio"
                        id="gicPaidNo"
                        name="gicPaid"
                        value="no"
                        className={`form-check-input ${errors.gicPaid && touched.gicPaid ? 'is-invalid' : ''}`}
                      />
                      No
                    </label>
                  </div>
                </div>
                <ErrorMessage name="gicPaid" component="div" className="invalid-feedback" />
              </div>

              {/* GIC Amount Paid */}
              <div className="form-group">
                <label htmlFor="gicAmountPaid">How much did you pay towards GIC?</label>
                <Field
                  type="text"
                  id="gicAmountPaid"
                  name="gicAmountPaid"
                  className={`form-control ${errors.gicAmountPaid && touched.gicAmountPaid ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="gicAmountPaid" component="div" className="invalid-feedback" />
              </div>

              <div className="form-group">
                <button type="submit" className="submit-button">Submit</button>
              </div>
            </Form>
          )}
        </Formik>
      </div> : 
      <div className="form-container">
      <p className="heading">Thank You</p>
      <p className="sub-heading">
        Your Statement of Purpose has been generated and sent to your email address. Please check your email.
      </p>
      </div>}
    </div>
  );
}

export default Detailes_Form;
