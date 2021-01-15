export const GOOGLE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDt+9tLrjiXyI1b\n+JyjJDelfc+OR0LGwiG2/L3Ppgwd0VlN5Dh0IyCP3QbR6oEiRldxSWvue8yBpRCN\nAU3ruoi/GX0jVeec9abvQ1mharOkQJUU8tyWhilMcBRpwsOgQORUcBDt/QNgSmX3\nEHOAfU3LCQA9WGQyr+Wl1v0kw2vKLoWLPyXzYf8a52JvOS0A7NT2vFxYNOXyFHZj\n+aWwlbLSIX0Par+6Ln6JzovEbNG6QoIgi1i8OQ4v9eOGh7XslnzhCDcZjN4GMbks\nizYJRwKqPSyJ8f3R8PwuzbEsLYMP4KTor5rYXEXe8hAbdXHo2uVPxeM83b1jiAS8\nzBjG9Rj1AgMBAAECggEAIxUeN7K4DV7CFqf4hgTtnnFaBWo+5Khd/6jpiFtnl4Zd\nk7chlV6k9bWfxEE9hnfNJdpXgAwdp+eqoBwW8w8ICqKEyTk9kBdsjlf6NhVR5H76\nxeBOzB0nUxPbW9ibgxvIgnlqHX36H0Sdxxqp6ZaklFpAKqBFq8KKEvUK/f5AUnOu\nyRpDvhGlpitRA2/8f2USKR4gj4nTJHk4+lNGV8zd0ABl4SG8RidsdtfUYoqcpeAY\nem67pdXuSipwhHqQyG+KXmanRC3I2kZom+K/ZLFu4+2FD9bBMCcP+jYAx4jYkc0l\nl3A5JOYchWPY9/THan1Ef0TK4uI180PxQxdOVlXGnwKBgQD26QkPrBRHDEXSiUQF\nggTIF28i8EFTb6ecfDBJMyYx0BzMZ4DQW0A/XMWNzIwi5G7dOq6AKvHOBoyU4sLl\nuHl3ZNx5bUN9Z5Uvul0IjadObbtfj5aj3SccWjUm3tGQpOdJXRYUfpLkfdPAxvbk\nAeqpvWgKJijDiVe78j5GxohHcwKBgQD2vrHzaoxzhDvby2pnjY/2D7yKlQuDQajD\nmzE6dLiXP1rwctuRHvbMS9uJrnhMbVN5O67+ZnFG/J+6mBTAFYI1ZisR0kG1uqKF\nB97V9AseoPwbLCIrGOThiojxLdUOlMcJYK/cPF4FqVd7ksni+aHW1tn1soC3w05g\nVoyQRkLz9wKBgQC8Hli1BBp+9y7LdaHJwIH8IT6flAVxmIRPiZ8QZlQXZ8RJSCKw\nnJWasQgjPVEX1ItTKr6BEDcjDYJWfV6Yv7Br8wC30zO0fBMCRi9TsPljm99Cs5fG\nSVzfESul7eYlGj7Neoq0Gqu4QtXu7qh0l7E+mfyGnwQ31pBttecU7XYvWQKBgQC0\nEi8kCdo+Y36bxTP+Jp2tYYajTGp+e+iB+DxRAOXF24Kuf+QlYIeUSLgLHrzEafTF\nQP1Qw8pfl/Wp41shY5EHD2zXMK6rxWzd0QSa9+M1kx7pZaf588z1nHicKmqWnZU0\nDs/I1nV3hEJH+LRFZRDrDRk76e1uLqaAQCmNEPnDuQKBgFJEodWi2pmV4jVKH4ls\nbyxm6ymZ/SxVRkvcOhBAnFUItPIqv4HLxhzrGU/VxVfBnfp8OfpLnd3YzWY0QLTq\nydOu2UWx2++fnjrM/QvG/lhbEyR8BDZUvZEHtY4vtroqC82vdLpegKPzHm5JUSHo\n1j0Y/SMcQvDhqMb0iDogMcr+\n-----END PRIVATE KEY-----\n';
export const GOOGLE_SPREADSHEET_KEY = '1XVBXcv0LCrJRaWvRYqhftreUuhDRkXizI1aSR4yw3TU';
export const GOOGLE_SHEET_ID = '1307714017';
export const GOOGLE_CLIENT_EMAIL = 'db-dig-investimento-service@db-dig-investiment.iam.gserviceaccount.com';

export function getClasse() {
  const classes = [
    {name: 'FII', code: 'FII'},
    {name: 'Tesouro Direto', code: 'Tesouro Direto'},    
  ]
  return classes;
}

export function getTipoOp() {
  const tipoOps = [
    {name: 'Compra', code: 'Compra'},
    {name: 'Venda', code: 'Venda'},    
  ]
  return tipoOps;
}

export function getTesouro() {
  const tesouros = [
    {name: 'Tesouro Selic 2025', code: 'Tesouro Selic 2025'},
    {name: 'Tesouro Prefixado 2025', code: 'Tesouro Prefixado 2025'},
    {name: 'Tesouro IPCA+ 2026', code: 'Tesouro IPCA+ 2026'},
    {name: 'Tesouro IPCA+ 2024', code: 'Tesouro IPCA+ 2024'},
    {name: 'Tesouro Prefixado 2026', code: 'Tesouro Prefixado 2026'}
  ]
  return tesouros;
}

export function getFII() {
  
  const fiis = [
    {name: 'ABCP11', code: 'ABCP11'},
    {name: 'AFCR11', code: 'AFCR11'},
    {name: 'AIEC11', code: 'AIEC11'},
    {name: 'ALMI11', code: 'ALMI11'},
    {name: 'ALZR11', code: 'ALZR11'},
    {name: 'ARCT11', code: 'ARCT11'},
    {name: 'ARRI11', code: 'ARRI11'},
    {name: 'ATSA11', code: 'ATSA11'},
    {name: 'BARI11', code: 'BARI11'},
    {name: 'BBFI11B', code: 'BBFI11B'},
    {name: 'BBPO11', code: 'BBPO11'},
    {name: 'BBRC11', code: 'BBRC11'},
    {name: 'BCFF11', code: 'BCFF11'},
    {name: 'BCIA11', code: 'BCIA11'},
    {name: 'BCRI11', code: 'BCRI11'},
    {name: 'BICR11', code: 'BICR11'},
    {name: 'BLCP11', code: 'BLCP11'},
    {name: 'BMLC11', code: 'BMLC11'},
    {name: 'BNFS11', code: 'BNFS11'},
    {name: 'BPFF11', code: 'BPFF11'},
    {name: 'BPML11', code: 'BPML11'},
    {name: 'BRCO11', code: 'BRCO11'},
    {name: 'BRCR11', code: 'BRCR11'},
    {name: 'BREV11', code: 'BREV11'},
    {name: 'BRLA11', code: 'BRLA11'},
    {name: 'BTCR11', code: 'BTCR11'},
    {name: 'BTLG11', code: 'BTLG11'},
    {name: 'BZLI11', code: 'BZLI11'},
    {name: 'CARE11', code: 'CARE11'},
    {name: 'CBOP11', code: 'CBOP11'},
    {name: 'CEOC11', code: 'CEOC11'},
    {name: 'CJCT11', code: 'CJCT11'},
    {name: 'CNES11', code: 'CNES11'},
    {name: 'CPFF11', code: 'CPFF11'},
    {name: 'CPTS11', code: 'CPTS11'},
    {name: 'CRFF11', code: 'CRFF11'},
    {name: 'CTXT11', code: 'CTXT11'},
    {name: 'CVBI11', code: 'CVBI11'},
    {name: 'CXCE11B', code: 'CXCE11B'},
    {name: 'CXRI11', code: 'CXRI11'},
    {name: 'CXTL11', code: 'CXTL11'},
    {name: 'DEVA11', code: 'DEVA11'},
    {name: 'DMAC11', code: 'DMAC11'},
    {name: 'DOMC11', code: 'DOMC11'},
    {name: 'DRIT11B', code: 'DRIT11B'},
    {name: 'EDFO11B', code: 'EDFO11B'},
    {name: 'EDGA11', code: 'EDGA11'},
    {name: 'EURO11', code: 'EURO11'},
    {name: 'FAED11', code: 'FAED11'},
    {name: 'FAMB11B', code: 'FAMB11B'},
    {name: 'FATN11', code: 'FATN11'},
    {name: 'FCFL11', code: 'FCFL11'},
    {name: 'FEXC11', code: 'FEXC11'},
    {name: 'FIGS11', code: 'FIGS11'},
    {name: 'FIIB11', code: 'FIIB11'},
    {name: 'FIIP11B', code: 'FIIP11B'},
    {name: 'FIVN11', code: 'FIVN11'},
    {name: 'FLMA11', code: 'FLMA11'},
    {name: 'FLRP11', code: 'FLRP11'},
    {name: 'FMOF11', code: 'FMOF11'},
    {name: 'FPAB11', code: 'FPAB11'},
    {name: 'FVPQ11', code: 'FVPQ11'},
    {name: 'GALG11', code: 'GALG11'},
    {name: 'GCFF11', code: 'GCFF11'},
    {name: 'GGRC11', code: 'GGRC11'},
    {name: 'GRLV11', code: 'GRLV11'},
    {name: 'GSFI11', code: 'GSFI11'},
    {name: 'GTWR11', code: 'GTWR11'},
    {name: 'HABT11', code: 'HABT11'},
    {name: 'HBRH11', code: 'HBRH11'},
    {name: 'HCRI11', code: 'HCRI11'},
    {name: 'HCTR11', code: 'HCTR11'},
    {name: 'HFOF11', code: 'HFOF11'},
    {name: 'HGBS11', code: 'HGBS11'},
    {name: 'HGCR11', code: 'HGCR11'},
    {name: 'HGFF11', code: 'HGFF11'},
    {name: 'HGLG11', code: 'HGLG11'},
    {name: 'HGPO11', code: 'HGPO11'},
    {name: 'HGRE11', code: 'HGRE11'},
    {name: 'HGRU11', code: 'HGRU11'},
    {name: 'HLOG11', code: 'HLOG11'},
    {name: 'HMOC11', code: 'HMOC11'},
    {name: 'HOSI11', code: 'HOSI11'},
    {name: 'HPDP11', code: 'HPDP11'},
    {name: 'HREC11', code: 'HREC11'},
    {name: 'HSML11', code: 'HSML11'},
    {name: 'HTMX11', code: 'HTMX11'},
    {name: 'HUSC11', code: 'HUSC11'},
    {name: 'IBFF11', code: 'IBFF11'},
    {name: 'IFIE11', code: 'IFIE11'},
    {name: 'IRDM11', code: 'IRDM11'},
    {name: 'JPPA11', code: 'JPPA11'},
    {name: 'JRDM11', code: 'JRDM11'},
    {name: 'JSRE11', code: 'JSRE11'},
    {name: 'KFOF11', code: 'KFOF11'},
    {name: 'KNCR11', code: 'KNCR11'},
    {name: 'KNHY11', code: 'KNHY11'},
    {name: 'KNIP11', code: 'KNIP11'},
    {name: 'KNRE11', code: 'KNRE11'},
    {name: 'KNRI11', code: 'KNRI11'},
    {name: 'KNSC11', code: 'KNSC11'},
    {name: 'LASC11', code: 'LASC11'},
    {name: 'LGCP11', code: 'LGCP11'},
    {name: 'LUGG11', code: 'LUGG11'},
    {name: 'LVBI11', code: 'LVBI11'},
    {name: 'MALL11', code: 'MALL11'},
    {name: 'MAXR11', code: 'MAXR11'},
    {name: 'MBRF11', code: 'MBRF11'},
    {name: 'MCCI11', code: 'MCCI11'},
    {name: 'MFAI11', code: 'MFAI11'},
    {name: 'MFII11', code: 'MFII11'},
    {name: 'MGCR11', code: 'MGCR11'},
    {name: 'MGFF11', code: 'MGFF11'},
    {name: 'MGHT11', code: 'MGHT11'},
    {name: 'MORE11', code: 'MORE11'},
    {name: 'MXRF11', code: 'MXRF11'},
    {name: 'NCHB11', code: 'NCHB11'},
    {name: 'NEWL11', code: 'NEWL11'},
    {name: 'NEWU11', code: 'NEWU11'},
    {name: 'NSLU11', code: 'NSLU11'},
    {name: 'NVHO11', code: 'NVHO11'},
    {name: 'NVIF11B', code: 'NVIF11B'},
    {name: 'ONEF11', code: 'ONEF11'},
    {name: 'OUFF11', code: 'OUFF11'},
    {name: 'OUJP11', code: 'OUJP11'},
    {name: 'OULG11', code: 'OULG11'},
    {name: 'OURE11', code: 'OURE11'},
    {name: 'PABY11', code: 'PABY11'},
    {name: 'PATC11', code: 'PATC11'},
    {name: 'PATL11', code: 'PATL11'},
    {name: 'PLCR11', code: 'PLCR11'},
    {name: 'PLRI11', code: 'PLRI11'},
    {name: 'PORD11', code: 'PORD11'},
    {name: 'PQAG11', code: 'PQAG11'},
    {name: 'PQDP11', code: 'PQDP11'},
    {name: 'PRSV11', code: 'PRSV11'},
    {name: 'PVBI11', code: 'PVBI11'},
    {name: 'QAGR11', code: 'QAGR11'},
    {name: 'QMFF11', code: 'QMFF11'},
    {name: 'RBBV11', code: 'RBBV11'},
    {name: 'RBCB11', code: 'RBCB11'},
    {name: 'RBCO11', code: 'RBCO11'},
    {name: 'RBDS11', code: 'RBDS11'},
    {name: 'RBED11', code: 'RBED11'},
    {name: 'RBFF11', code: 'RBFF11'},
    {name: 'RBGS11', code: 'RBGS11'},
    {name: 'RBIV11', code: 'RBIV11'},
    {name: 'RBRD11', code: 'RBRD11'},
    {name: 'RBRF11', code: 'RBRF11'},
    {name: 'RBRL11', code: 'RBRL11'},
    {name: 'RBRP11', code: 'RBRP11'},
    {name: 'RBRR11', code: 'RBRR11'},
    {name: 'RBRY11', code: 'RBRY11'},
    {name: 'RBVA11', code: 'RBVA11'},
    {name: 'RBVO11', code: 'RBVO11'},
    {name: 'RCRB11', code: 'RCRB11'},
    {name: 'RDPD11', code: 'RDPD11'},
    {name: 'RECR11', code: 'RECR11'},
    {name: 'RECT11', code: 'RECT11'},
    {name: 'RFOF11', code: 'RFOF11'},
    {name: 'RNDP11', code: 'RNDP11'},
    {name: 'RNGO11', code: 'RNGO11'},
    {name: 'RVBI11', code: 'RVBI11'},
    {name: 'RZTR11', code: 'RZTR11'},
    {name: 'SADI11', code: 'SADI11'},
    {name: 'SARE11', code: 'SARE11'},
    {name: 'SCPF11', code: 'SCPF11'},
    {name: 'SDIL11', code: 'SDIL11'},
    {name: 'SHPH11', code: 'SHPH11'},
    {name: 'SPTW11', code: 'SPTW11'},
    {name: 'SPVJ11', code: 'SPVJ11'},
    {name: 'TEPP11', code: 'TEPP11'},
    {name: 'TGAR11', code: 'TGAR11'},
    {name: 'THRA11', code: 'THRA11'},
    {name: 'TORD11', code: 'TORD11'},
    {name: 'TRNT11', code: 'TRNT11'},
    {name: 'TRXF11', code: 'TRXF11'},
    {name: 'URPR11', code: 'URPR11'},
    {name: 'VCJR11', code: 'VCJR11'},
    {name: 'VGIP11', code: 'VGIP11'},
    {name: 'VGIR11', code: 'VGIR11'},
    {name: 'VIFI11', code: 'VIFI11'},
    {name: 'VILG11', code: 'VILG11'},
    {name: 'VINO11', code: 'VINO11'},
    {name: 'VISC11', code: 'VISC11'},
    {name: 'VLOL11', code: 'VLOL11'},
    {name: 'VOTS11', code: 'VOTS11'},
    {name: 'VRTA11', code: 'VRTA11'},
    {name: 'VSHO11', code: 'VSHO11'},
    {name: 'VTLT11', code: 'VTLT11'},
    {name: 'VVPR11', code: 'VVPR11'},
    {name: 'WPLZ11', code: 'WPLZ11'},
    {name: 'WTSP11B', code: 'WTSP11B'},
    {name: 'XPCI11', code: 'XPCI11'},
    {name: 'XPCM11', code: 'XPCM11'},
    {name: 'XPHT11', code: 'XPHT11'},
    {name: 'XPIN11', code: 'XPIN11'},
    {name: 'XPLG11', code: 'XPLG11'},
    {name: 'XPML11', code: 'XPML11'},
    {name: 'XPPR11', code: 'XPPR11'},
    {name: 'XPSF11', code: 'XPSF11'},
    { name: 'XTED11', code: 'XTED11' }
  ];

  return fiis;
}

// Função que retorno qual é o tipo do ativo (FII, FIA ou Tesouro)
export function getTipoAtivo(ativo) {

  let fii = getFII();

  for (let i = 0; i < fii.length; i++) {
    if (fii[i].name === ativo) {
      return "FII";
    }
  }

  let tesouro = getTesouro();

  for (let i = 0; i < tesouro.length; i++) {
    if (tesouro[i].name === ativo) {
      return "Tesouro"
    }
  }

  return "";
}

