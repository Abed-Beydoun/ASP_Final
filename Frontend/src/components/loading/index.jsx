import React from 'react'
import classnames from 'classnames'

const Wrapper = (props) => {
    const { loading, children, classes, full = true, ...restProp } = props
    if (loading) {
        return (
            <div
                className={classnames(
                    'flex justify-center items-center',
                    full && 'h-screen',
                )}
            >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 my-5" />
            </div>
        )
    }

    return (
        <div
            {...restProp}
            className={classnames(
                'p-0 m-0 hide-scrollbars',
                classes,
                full && 'min-h-full',
            )}
        >
            {children}
        </div>
    )
}

export default Wrapper
