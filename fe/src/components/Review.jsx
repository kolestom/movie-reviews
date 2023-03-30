import styles from './Review.module.css'
const Review = ({review}) => {
    return ( 
        <div className={styles.revCard}>
            <h2>{review.reviewer}</h2>
            <h2>{review.text}</h2>
        </div>
     );
}
 
export default Review