const Student = require("../models/Students");


async function handleGetallStudents(req, res) {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function handleUpdateStudentsByID(req, res) {
  try {
    const { email, name, gender } = req.body;
    const studentId = req.params.id;

    // Check if email is already in use by another student
    if (email) {
      const emailExists = await Student.findOne({ email, _id: { $ne: studentId } });
      if (emailExists) {
        return res.status(409).json({ message: "Email already exists." });
      }
    }

    // Check if a student with the same name and gender exists (excluding the current student)
    if (name && gender) {
      const nameGenderExists = await Student.findOne({ name, gender, _id: { $ne: studentId } });
      if (nameGenderExists) {
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')

        console.log("name and gender should not be passed!!!!");
        return res.status(409).json({ message: "Student with this name and gender already exists." });
      }
    }

    // Proceed with the update if no conflicts are found
    const student = await Student.findByIdAndUpdate(studentId, req.body, {
      new: true,
    });

    return res.json(student);
  } catch (err) {
    if(res.status===409){
      return res.json({message:err.message});
    }
    return res.status(500).json({ message: err.message });
  }
}






async function handleDeleteStudentByID(req, res) {
  try {
    await Student.findByIdAndDelete(req.params.id);
    return res.json({ message: "Student deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function handleCreateNewStudent(req, res) {
  
  console.log("===> In handleCreateNewStudent", req.user);
  const { name, email, gender } = req.body;
  try {
    if(await Student.findOne({email}) ){
      return res.status(409).json({message: "The Student is already exist"})
      // console.log(res.err)
    }
    if(await Student.findOne({name}) && await Student.findOne({gender})){
      return res.status(409).json({message: "The Student is already exist"})
      // console.log(res.json())
    }
    const newStudent = new Student(req.body);
    await newStudent.save();
    return res.json(newStudent);
  } catch (err) {
    if(res.status===409){
      return res.json({message:err.message});
    }
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  handleGetallStudents,
  handleCreateNewStudent,
  handleDeleteStudentByID,
  handleUpdateStudentsByID,
};
