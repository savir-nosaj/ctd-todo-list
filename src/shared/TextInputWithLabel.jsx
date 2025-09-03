function TextInputWithLabel({
    elementId,
    labelText,
    value,
    ref,
    onChange
}) {
    return (
        <>
            <label htmlFor={elementId}>{labelText}</label>
            <input
                id={elementId}
                value={value}
                ref={ref}
                type="text"
                onChange={onChange}
            />
        </>
    );
}

export default TextInputWithLabel;