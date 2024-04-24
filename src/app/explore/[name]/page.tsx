const Page = (props:any) => {
    const name = props.params.name
    return (
        <div>
            <div className="main-page-banner">
                <h1>Welcome to the {decodeURI(name)}</h1>
            </div>
        </div>
    )
}

export default Page