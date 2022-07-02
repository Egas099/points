const points: { [key in number]: JSX.Element } = {
    0: <></>,
    1: <>•</>,
    2: <>•&nbsp;•</>,
    3: (
        <>
            •<br />
            •&nbsp;•
        </>
    ),
    4: (
        <>
            •&nbsp;•
            <br />
            •&nbsp;•
        </>
    ),
    5: (
        <>
            •&nbsp;•
            <br />•<br />
            •&nbsp;•
        </>
    )
};
export default points;
