const generateID = () => Date.now() + Math.random().toString(32).substring(2);

export {
    generateID
}