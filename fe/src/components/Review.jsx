const Review = ({review}) => {
    return ( 
        <>
        <h2>{review.reviewer}</h2>
        <h2>{review.text}</h2>
        </>
     );
}
 
export default Review