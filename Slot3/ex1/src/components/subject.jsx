function Subject() {
    //khai bao 1 mảng chứa tên các môn học
    const SubjectArr = ['React', 'ReactNative', 'NodeJs'];
    return (
        <>
        <div>
            <h1>Course Name</h1>
        </div>
        <ul>
            {SubjectArr.map((subject,index) => (
                <li key={index}>{subject}</li>
            ))}
        </ul>
        </>
    );
}
export default Subject;