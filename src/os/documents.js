// Files that live on the desktop. Add an entry and it gets an icon + Preview
// support automatically — kind/size are derived, so any file type works.
export const DOCUMENTS = [
    { name: "resume.pdf", src: "/resume.pdf" },
    { name: "hometown_MTY.png", src: "/hometown.webp" },
];

const KIND_BY_EXT = {
    pdf: "pdf",
    png: "image",
    jpg: "image",
    jpeg: "image",
    webp: "image",
    gif: "image",
    svg: "image",
    txt: "text",
    md: "text",
    json: "text",
    csv: "text",
    log: "text",
};

export function fileExt(name) {
    return name.split(".").pop().toLowerCase();
}

export function fileKind(name) {
    return KIND_BY_EXT[fileExt(name)] ?? "binary";
}
