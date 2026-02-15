import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
    title: string;
    showBack?: boolean;
    rightAction?: React.ReactNode;
}

export function PageHeader({ title, showBack = true, rightAction }: PageHeaderProps) {
    const navigate = useNavigate();

    return (
        <header className="flex items-center bg-white dark:bg-gray-900 px-4 py-4 justify-between sticky top-0 z-10 border-b border-primary/10 dark:border-gray-700">
            <div className="flex items-center gap-3">
                {showBack && (
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center size-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[22px] dark:text-white">arrow_back</span>
                    </button>
                )}
                <h1 className="text-lg font-bold tracking-tight dark:text-white">{title}</h1>
            </div>
            {rightAction && <div className="flex gap-2">{rightAction}</div>}
        </header>
    );
}
