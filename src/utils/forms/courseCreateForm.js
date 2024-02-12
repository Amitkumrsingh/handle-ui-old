import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    border: '1px solid #e6e6e6',
    margin: '16px auto',
    padding: '2px 60px 97px',
    maxWidth: '800px',
    [theme.breakpoints.up('md')]: {
      margin: '16px 570px 26px 508px',
      padding: '2px 211px 97px 173px',
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    marginTop: '10px',
  },
  input: {
    marginTop: '10px',
    marginLeft: '10px',
  },
  plusIcon: { 
    marginLeft: '10px',
    marginTop: '10px',
    cursor: 'pointer',
  },
  sectionTitle: {
    backgroundColor: '#e6e6e6',
    padding: '6px',
    margin: '-2px',
    width: '100%',
    boxSizing: 'border-box',
    marginLeft: '-173px',
    [theme.breakpoints.up('md')]: {
      width: '265%',
      marginLeft: '-173px',
    },
  },
}));

export default function CourseCreateForm({ formTitle }) {
  const classes = useStyles();
  const [exams, setExams] = useState([]);
  const [careerOptions, setCareerOptions] = useState([]);
  const [colleges, setColleges] = useState([]);

  const handleExamChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setExams([...exams, value]);
    } else {
      setExams(exams.filter((exam) => exam !== value));
    }
  };

  const handleCareerOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCareerOptions([...careerOptions, value]);
    } else {
      setCareerOptions(careerOptions.filter((option) => option !== value));
    }
  };

  const handleCollegeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setColleges([...colleges, value]);
    } else {
      setColleges(colleges.filter((college) => college !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.section}>
        <h3 className={classes.sectionTitle}>Exams</h3>
        <label className={classes.label}>
          NIFT
          <input
            type="checkbox"
            value="NIFT"
            checked={exams.includes('NIFT')}
            onChange={handleExamChange}
          />
        </label>
        <label className={classes.label}>
          NID
          <input
            type="checkbox"
            value="NID"
            checked={exams.includes('NID')}
            onChange={handleExamChange}
          />
        </label>
        <label className={classes.label}>
          CEED
          <input
            type="checkbox"
            value="CEED"
            checked={exams.includes('CEED')}
            onChange={handleExamChange}
          />
        </label>
        <label className={classes.label}>
          Other:
          <input type="text" className={classes.input} />
          <AddIcon className={classes.plusIcon} />
        </label>
      </div>

      <div className={classes.section}>
        <h3 className={classes.sectionTitle}>Desired Career Options</h3>
        <label className={classes.label}>
          Graphic Designer
          <input
            type="checkbox"
            value="Graphic Designer"
            checked={careerOptions.includes('Graphic Designer')}
            onChange={handleCareerOptionChange}
          />
        </label>
        <label className={classes.label}>
          Product Designer
          <input
            type="checkbox"
            value="Product Designer"
            checked={careerOptions.includes('Product Designer')}
            onChange={handleCareerOptionChange}
          />
        </label>
        <label className={classes.label}>
          Other:
          <input type="text" className={classes.input} />
          <AddIcon className={classes.plusIcon} />
        </label>
      </div>

      <div className={classes.section}>
        <h3 className={classes.sectionTitle}>Desired Colleges</h3>
        <label className={classes.label}>
          JNAFAU
          <input
            type="checkbox"
            value="JNAFAU"
            checked={colleges.includes('JNAFAU')}
            onChange={handleCollegeChange}
          />
        </label>
        <label className={classes.label}>
          UID
          <input
            type="checkbox"
            value="UID"
            checked={colleges.includes('UID')}
            onChange={handleCollegeChange}
          />
        </label>
        <label className={classes.label}>
          Other:
          <input type="text" className={classes.input} />
          <AddIcon className={classes.plusIcon} />
        </label>
      </div>
    </form>
  );
}
