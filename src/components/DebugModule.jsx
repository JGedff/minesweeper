export const DebugModule = ({ debugFunction }) => {
    return (
        <input className='debugInput' readOnly autoFocus onKeyDown={debugFunction}></input>
    )
}