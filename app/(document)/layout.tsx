import './a4.css'

export default function PanelLayout({
	children,
}: {
	children: React.ReactNode
}) {
    return (
        <div className="A4 landscape">
            <section className="sheet p-2">
                {children}
            </section>
        </div>
    )
}