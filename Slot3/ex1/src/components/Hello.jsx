function Hello() {
    const reactStyle = {
        fontSize: 48,
        color: 'blue',
        fontWeight: 'normal'
    }
    return (
        <>
        <div>
     <p > Hello <span style={reactStyle}>React</span></p>
    </div>
    </>
    );
}

export default Hello;