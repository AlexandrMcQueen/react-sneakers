import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={1}
        width={210}
        height={260}

        viewBox="0 0 210 290"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="5" y="-30" rx="25" ry="25" width="220" height="225" />
        <rect x="5" y="212" rx="3" ry="3" width="155" height="15" />
        <rect x="5" y="238" rx="3" ry="3" width="93" height="15" />
        <rect x="5" y="268" rx="3" ry="3" width="80" height="24" />
        <rect x="155" y="254" rx="8" ry="8" width="32" height="32" />
    </ContentLoader>
)

export default MyLoader


