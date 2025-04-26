import classes from './loading.module.css'

const LoadingPage = () => {
    return (
        <p className={classes.loading}>
            Fetching meals...
        </p>
    )
}

export default LoadingPage;