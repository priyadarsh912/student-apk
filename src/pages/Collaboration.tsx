import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const activeUsers = [
    { name: "Sarah J.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1-L65NbdbIt-NFTcCEuBWzVUUsoNu1n8mvCwZMqWHB-1LTIo7Yr8uf5DkNHNxYVFU-7urPtmD3JPL_73dWoYzXVGqZNG14vfR13TdPTZiZutADTqIqPwjkYbLNEQtypkHL0CnE5BmC_v5ANbjbm4gNAxagupJDJjwn2-Z7TehP5EfZyrVTXjY5JlS8zkxFHTHXCtaZLRS-haeqpcQVIsh2DGxWi0Ys2-k6UqehAnAGm7b05CCE3Y-ST5ZOTuy8Fo5wPQwYXa3cMA_", online: true },
    { name: "Mike D.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAILyIuywVIqke1PJzOBCbmDmu2r5rFMSPgF6BOFumLcxd6LEr_yRnKX_nNwgC8D0506K2dNmPo-Uzz3Z_1JzGQIyTrKIv08PASuYiKJyN4-R1XcTue_rWTn4l1wJf7m1G2Iu5hay7wP6Trm7UPgP575kGFWEeCiLztCgPShidE4pQJ-ZJHoplWzM-61OXqw0yduuqR5h_cPyOU7x66cOpbDIfs2o9lyQ6wpJNfbaMFC2N4SJbpjZD--_cooZZyvfcU-42JHuPLzQM3", online: true },
    { name: "Lisa K.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK88WtKJmYmU63N7xCgEOGNXQWdy-xh-GyQVPiumD-tAVHwAZUcjpbv6U20md9EzvKdV_20Ai5o2LIF0UO48RiKwJcI8-HLmIJXct8meKAlwsb2XRpPiDJtrkhirw9hKP9wDM4uWLQIRJ0wzA0cDeYeNanR7khARo2zKoPUvEaQzkmHCiDn66ZMFPjXSHa0y1sdCpk5UxMatWerCXCPLvtyTE0b-XnH_YZ62FoL1XWLMPGK6TVv2q77GpPXB5cbJ49DoipQEi2Erhl", online: false },
];

const activity = [
    { user: "Sarah J.", action: "shared a document", target: "CS201_Notes.pdf", time: "5 min ago", icon: "upload_file", iconColor: "bg-primary/10 text-primary" },
    { user: "Mike D.", action: "commented on", target: "Project Proposal", time: "15 min ago", icon: "chat_bubble", iconColor: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" },
    { user: "Prof. Miller", action: "created a new", target: "Study Group", time: "1 hour ago", icon: "group_add", iconColor: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" },
];

const resources = [
    { name: "CS201 Mid-term Notes.pdf", type: "PDF", size: "2.4 MB", sharedBy: "Sarah J.", icon: "picture_as_pdf", iconColor: "bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400" },
    { name: "Project Proposal Draft", type: "DOCX", size: "1.1 MB", sharedBy: "Mike D.", icon: "description", iconColor: "bg-primary/10 text-primary" },
    { name: "Presentation Slides", type: "PPTX", size: "5.8 MB", sharedBy: "Lisa K.", icon: "slideshow", iconColor: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" },
];

export default function Collaboration() {
    return (
        <MobileLayout>
            <PageHeader title="Collaboration" />

            <div className="px-4 py-6">
                {/* Active Now */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#637388] mb-3">Active Now</h3>
                    <div className="flex gap-4">
                        {activeUsers.map((u, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <div className="relative">
                                    <div className="size-14 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
                                        <img src={u.img} alt={u.name} className="size-full object-cover" />
                                    </div>
                                    {u.online && <div className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />}
                                </div>
                                <span className="text-xs font-medium dark:text-gray-300">{u.name}</span>
                            </div>
                        ))}
                        <div className="flex flex-col items-center gap-1">
                            <div className="size-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[#637388]">
                                <span className="material-symbols-outlined text-2xl">add</span>
                            </div>
                            <span className="text-xs font-medium text-[#637388]">Invite</span>
                        </div>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold dark:text-white">Activity Feed</h3>
                        <button className="text-primary text-sm font-semibold">See All</button>
                    </div>
                    <div className="flex flex-col gap-3">
                        {activity.map((a, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                <div className={`size-10 rounded-lg flex items-center justify-center ${a.iconColor}`}>
                                    <span className="material-symbols-outlined text-lg">{a.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm">
                                        <span className="font-medium dark:text-white">{a.user}</span>
                                        <span className="text-[#637388]"> {a.action} </span>
                                        <span className="font-medium text-primary">{a.target}</span>
                                    </p>
                                    <p className="text-xs text-[#637388]">{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shared Resources */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold dark:text-white">Shared Resources</h3>
                        <button className="text-primary text-sm font-semibold">Upload</button>
                    </div>
                    <div className="flex flex-col gap-3">
                        {resources.map((r, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                <div className={`size-10 rounded-lg flex items-center justify-center ${r.iconColor}`}>
                                    <span className="material-symbols-outlined text-lg">{r.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate dark:text-white">{r.name}</p>
                                    <p className="text-xs text-[#637388]">{r.type} • {r.size} • by {r.sharedBy}</p>
                                </div>
                                <button className="text-primary">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
}
