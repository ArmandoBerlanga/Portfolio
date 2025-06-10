import { certsTypes } from "../config/certifications";

export default function CertificationsSection() {
    return (
        <section id="certifications" className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500 rounded-2xl">
            <h2 className='text-4xl md:text-5xl font-extrabold text-primary/90 mb-10 text-center tracking-tight drop-shadow-sm'>Certifications</h2>

            <div className="certification-types grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-4 md:px-0">
                {Object.entries(certsTypes).map(([type, items]) => (
                    <div key={type} className="certification-type bg-white/90 dark:bg-slate-800/90 border border-primary/10 dark:border-slate-700 rounded-2xl shadow-xl p-8 transition-colors flex flex-col">
                        <h2 className='text-2xl md:text-3xl font-bold text-primary/80 mb-6 drop-shadow-sm'>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                        <ul className="certification-list flex flex-col gap-6 overflow-y-auto pr-2" style={{ maxHeight: '400px' }}>
                            {items.map((item, index) => (
                                <li key={index} className="mb-0">
                                    <a href={item.url !== '---' ? item.url : undefined} target="_blank" rel="noopener noreferrer" className={`text-primary font-semibold text-lg md:text-xl hover:underline ${item.url === '---' ? 'pointer-events-none opacity-60' : ''}`}>{item.name}</a>
                                    <p className='text-sm text-slate-500 dark:text-slate-400 mt-1'>{item.issuer} <span className="mx-1">|</span> {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</p>
                                    <p className='text-slate-700 dark:text-slate-200 mt-2 text-base'>{item.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {item.aptitudes.map((apt, i) => (
                                            <span key={i} className='bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-xs shadow-sm border border-primary/20'>{apt}</span>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}