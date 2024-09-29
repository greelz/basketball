interface Props {
    children: React.ReactNode;
}

export default function Card({ children }: Props) {

    return (
        <div className="bggrayd-nohov rounded-lg">
            <div className="flex flex-col">
                {children}
            </div>
        </div>
    )
}