const  ID = '141684'
const BASE_URL = 'http://185.244.172.108:8081/'

const ENDPOINTS = {
    getRowList: `/v1/outlay-rows/entity/${ID}/row/list`,
    createRow: `/v1/outlay-rows/entity/${ID}/row/create`,
    updateRow: `/v1/outlay-rows/entity/${ID}/row/{rID}/update`,
    deleteRow: `/v1/outlay-rows/entity/${ID}/row/{rID}/delete`,
}
