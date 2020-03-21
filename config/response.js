module.exports = {
  errorResponse: (msg) => {
    return {
      sukses: false,
      msg: msg
    }
  },
  suksesResponse: (msg) => {
    return {
      sukses: false,
      msg: msg
    }
  },
  suksesResult: (data) => {
    return {
      sukses: true,
      msg: 'Berhasil Mendapatkan Data',
      result: data
    }
  },
  nullResult: () => {
    return {
      sukses: false,
      msg: 'Tidak Ada Data',
      result: null
    }
  },
  errorResult: () => {
    return {
      sukses: false,
      msg: 'Gagal Mendapatkan Data',
      data: null
    }
  }
}