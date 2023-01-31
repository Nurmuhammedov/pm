const customTrim = (value) => value.trim()
const handleTestsFieldsChange = (tests = []) => {
    return tests.map(test => {
        return {
            value: test?.id,
            label: test?.title
        }
    })
}

const handleAnswers = (arr, id) => {
    return arr.map(item => {
        return {
            user_test: id,
            user_answer: item.answer,
            question: item.id
        }
    })
}
export {customTrim, handleTestsFieldsChange, handleAnswers}