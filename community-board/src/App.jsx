import './App.css';
import Scholarship from './components/Scholarship.jsx';

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Scholarship Board</h1>
        <p>Welcome to the Scholarship Board!</p>
        <p>Here you can find various STEM major scholarships, their description, and the links to their website application.</p>
      </header>
      <main className="scholarship-container">
        <Scholarship 
          title="Women at Microsoft (WAM) Scholarship"
          description="Empowering women and non-binary high school seniors to pursue a career in the technology industry."
          link="https://www.microsoft.com/en-us/diversity/programs/women-at-microsoft-scholarship"
          list={[
              "High school senior",
              "Have a cumulative GPA of 3.0 on a 4.0 scale",
              "Self-identify as a woman, non-binary, gender fluid or transgender woman",
              "Plan to attend a four-year college or university and  enroll full-time in Engineering, Computer Science, Computer Information Systems, or one of the following Business programs"
          ]}
        /><Scholarship 
          title="Black at Microsoft (BAM) Scholarship"
          description="The BAM Scholarship was created to enable Black and African American students to attend college and pursue a career in technology.  The goal is to empower future generations to do and be more."
          link="https://www.microsoft.com/en-us/diversity/programs/bam-scholarship/?msockid=39ae3ec4f129606d04d528c4f0c461e0"
          list={[
            "High school senior",
            "Have a cumulative GPA of 3.0 on a 4.0 scale",
            "Plan to attend a four-year college or university and  enroll full-time in Engineering, Computer Science, Computer Information Systems, or one of the following Business programs"
          ]}
        /><Scholarship 
          title="Peggy Dixon Two-Year Scholarship"
          description="The purpose of the Society of Physics Students scholarship program is to encourage the study of physics and the pursuit of high scholarship."
          link="https://www.spsnational.org/scholarships/dixon"
          list={[
            "Must be a member of the Society of Physics Students",
            "Must be a full-time student at a two-year college",
            "Must have completed at least one semester or quarter of the introductory physics sequence"
          ]}
        /><Scholarship 
          title="AIAA Roger W. Kahn Scholarship"
          description="A scholarship for high school seniors who enroll in an engineering major at a college or university."
          link="https://aiaa.org/get-involved/k-12-students/scholarships/aiaa-roger-w.-kahn-scholarship/"
          list={[
            "Current high school senior intending to pursue an aerospace or related major at a college or university",
            "Minimum high school GPA of 3.5",
            "Must have an AIAA High School Membership – It’s Free!"
          ]}
        /><Scholarship 
          title="Steinman Scholarship"
          description="The Steinman Scholarship is awarded annually to undergraduates entering or continuing their junior year in a four-year ABET-accredited engineering program."
          link="https://www.nspe.org/membership/types-membership/student/steinman-scholarship"
          list={[
            "Are currently enrolled in good standing in a four-year ABET accredited engineering program",
            "Will be entering or continuing their junior year in the fall",
            "Plan to attend a foun-year college or university and  enroll full-time in Engineering, Computer Science, Computer Information Systems, or one of the following Business programs"
          ]}
        /><Scholarship 
          title="Generation Google Scholarship"
          description="The Generation Google Scholarship was established to help aspiring students pursuing computer science degrees excel in technology and become leaders in the field."
          link="https://www.google.com/about/careers/applications/buildyourfuture/scholarships/generation-google-scholarship"
          list={[
            "High school senior or full-time undergraduate student",
            "Be studying computer science, computer engineering, or a closely related technical field",
            "Demonstrate financial need"
          ]}
        /><Scholarship 
          title="Science, Mathematics, and Research for Transformation (SMART) Scholarship-for-Service Program"
          description="This program provides scholarships for undergraduate and graduate students pursuing degrees in STEM disciplines."
          link="https://www.smartscholarship.org/smart?id=kb_article&sys_id=b8fb18e0db8a8300ecc734cc7c9619d7"
          list={[
          "[ENTER SOMETHING HERE]",
          ]}
        /><Scholarship 
          title="National Society of Black Engineers Scholarships"
          description="Each Spring and Fall, NSBE and its partners award over a million dollars in scholarships."
          link="https://nsbe.org/scholarships/"
          list={[
            "[ENTER SOMETHING HERE]",
          ]}
        /><Scholarship 
          title="Bright Future Foundation"
          description="The Bright Future Foundation is a non-profit organization that provides scholarships to high school seniors who are pursuing a degree in STEM fields."
          link="https://forabrightfuturefoundation.wufoo.com/forms/z1ts7hge0pecdny/"
          list={[
              "Grade point average above 3.0.",
              "Participation in the workforce",
              "Special circumstances"
            ]}
        /><Scholarship 
          title="NASA Iowa Space Grant Consortium Scholarship"
          description="The Iowa Space Grant Consortium (ISGC) is a NASA-funded program that provides scholarships to students pursuing degrees in STEM fields."
          link="https://www.scholarships.com/scholarships/nasa-iowa-space-grant-consortium-scholarship"
          list={[
            "Grade point average above 3.0.",
            "Must be a resident of Iowa or attending an Iowa college or university",
          ]}
        />
      </main>
      
    </div>
  )
}

export default App