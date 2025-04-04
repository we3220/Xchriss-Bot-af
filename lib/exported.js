const getAdmin = async(conn, m) => {
        var adminn = await conn.groupMetadata(m.jid);
        a = [];
        for (let i of adminn.participants) {
            if (i.admin == null) continue;
            a.push(i.id);
        }
        return a;
}

const {
    getBuffer,
    fetchJson,
    sleep,
    isUrl,
    jsonformat,
    getSizeMedia,
    GIFBufferToVideoBuffer,
    byteToSize
} = require('./functions') 
module.exports = {
    getBuffer,
    fetchJson,
    sleep,
    isUrl,
    jsonformat,
    getSizeMedia,
    GIFBufferToVideoBuffer,
    byteToSize,
    getAdmin
}
