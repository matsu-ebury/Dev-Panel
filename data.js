const sprintData = {
        "DBA-2526SP4": {
        "effort": {"build": 82, "develop": 75, "refine": 25},
        "epics": {     
            "DBA-1407 [BK-Tech] Internalização Accouts (PayIN)": {"Done": 24, "Done in Sprint": 2, "Pending": 5, "Dropped": 0}, 
            "DBA-1608: Settlement Filtros": {"Done": 6, "Done in Sprint": 12, "Pending": 0, "Dropped": 0},
            "DBA-1659: Front Transferencia interna": {"Done": 0, "Done in Sprint": 16, "Pending": 4, "Dropped": 0},
            "DBA-1745: Foundations Expired PIX Certificates": {"Done": 2, "Done in Sprint": 13, "Pending": 8, "Dropped": 0},
            "DBA-1188: Foundations marcar depósitos e retiradas com flag NRA": {"Done": 0, "Done in Sprint": 13, "Pending": 42, "Dropped": 0},
            "DBA-1609: Adição de dados no relatório de liquidação": {"Done": 2, "Done in Sprint": 4, "Pending": 6, "Dropped": 0},
            "DBA-1694: Melhorias no fluxo de liquidação": {"Done": 2, "Done in Sprint": 3, "Pending": 0, "Dropped": 0},
        },
        "run_causes": {"CancelamentoParcial": 2, "DepositoErrado": 2, "ValorIncorreto": 1, "FluxoIncorreto":1}
    },
    "DBA-2526SP3": {
        "effort": {"build": 72, "develop": 84, "refine": 16},
        "epics": {
            "DBA-1142: Documentação em Open API": {"Done": 34, "Done in Sprint": 6, "Pending": 0, "Dropped": 0},
            "DBA-1272: Melhorias UX Withdraw": {"Done": 57, "Done in Sprint": 6, "Pending": 0, "Dropped": 0},
            "DBA-1608: Settlement Filtros": {"Done": 6, "Done in Sprint": 3, "Pending": 14, "Dropped": 0},
            "DBA-1659: Front Transferencia interna": {"Done": 0, "Done in Sprint": 0, "Pending": 0, "Dropped": 13},
            "DBA-1104: Transferencia Interna": {"Done": 17, "Done in Sprint": 16, "Pending": 0, "Dropped": 0},
            "DBA-1005: Transferencias via API": {"Done": 86, "Done in Sprint": 13, "Pending": 0, "Dropped": 0},
            "DBA-1339: Habilitar depósitos de qualquer pessoa": {"Done": 12, "Done in Sprint": 3, "Pending": 0, "Dropped": 0},
            "DBA-1764: Pix Automatico": {"Done": 8, "Done in Sprint": 6, "Pending": 0, "Dropped": 0},
            "DBA-1745: Foundations Expired PIX Certificates": {"Done": 0, "Done in Sprint": 2, "Pending": 8, "Dropped": 0}
        },
        "run_causes": {"GestãoContas": 6, "DepositoErrado": 4, "MotorTaxas": 2, "ValorMenor": 2, "UsoIncorreto": 2, "DuploCliqueConcMN": 1, "CalculoIR": 1, "CancelamentoParcial":1, "TreeSemPix":1}
    },
    "DBA-2526SP2": {
        "effort": {"build": 60, "develop": 90, "refine": 10},
        "epics": {
            "DBA-1142: Documentação em Open API": {"Done": 28, "Done in Sprint": 13, "Pending": 6, "Dropped": 0},
            "DBA-1463: Comprovantes": {"Done": 7, "Done in Sprint": 13, "Pending": 0, "Dropped": 0},
            "DBA-1362: Decomissionamento Payout": {"Done": 4, "Done in Sprint": 6, "Pending": 8, "Dropped": 0}
        },
        "run_causes": {"WrongFlow": 8, "ValorMenor": 6, "DepositoFilialMatriz": 4, "SettlementEventDate": 5}
    },
    "DBA-2526SP1": {
      "effort": {"build": 74, "develop": 85, "refine": 15},
      "epics": {
          "Renew PIX Certificates": {"Done": 6, "Done in Sprint": 5, "Pending": 3, "Dropped": 3},
          "Internalização Accouts (PayIN)": {"Done": 8, "Done in Sprint": 8, "Pending": 2, "Dropped": 0},
          "Melhorias na experiência do withdraw via crossbex": {"Done": 10, "Done in Sprint": 10, "Pending": 2, "Dropped": 0},
          "Settlement Filtros": {"Done": 3, "Done in Sprint": 3, "Pending": 10, "Dropped": 0},
          "API - Transferência Interna": {"Done": 16, "Done in Sprint": 16, "Pending": 10, "Dropped": 0},
          "DBA-1142: Documentação em Open API": {"Done": 15, "Done in Sprint": 15, "Pending": 19, "Dropped": 0},
      },
      "run_causes": {"WrongFlow": 5.5, "ValorMenor": 5, "DepositoFilialMatriz": 1.5, "SettlementEventDate": 1}
    }
};

const epicData = {
    "DBA-1142: Documentação em Open API": { "Stories": 10, "Story Points": 40, "Progress": 100},
    "DBA-1272: Melhorias UX Withdraw": { "Stories": 5, "Story Points": 16, "Progress": 100},
    "DBA-1104: Transferencia Interna": { "Stories": 5, "Story Points": 32, "Progress": 100},
    "DBA-1005: Transferencias via API": { "Stories": 2, "Story Points": 13, "Progress": 100},
    "DBA-1339: Habilitar depósitos de qualquer pessoa": { "Stories": 2, "Story Points": 8, "Progress": 100},
    "DBA-1764: Pix Automatico": { "Stories": 3, "Story Points": 14, "Progress": 100},
    "DBA-1659: Front Transferencia interna": { "Stories": 2, "Story Points": 16, "Progress": 100},
    "DBA-1608: Settlement Filtros": { "Stories": 7, "Story Points": 23, "Progress": 100},
    "DBA-1694: Settlement - Melhorias no fluxo de liquidação": { "Stories": 2, "Story Points": 5, "Progress": 100},
    // "DBA-1362: Descomissionamento Payout": { "Stories": 3, "Story Points": 18, "Progress": 75 },
    "DBA-1609: Adição de dados no relatório de liquidação": { "Stories": 4, "Story Points": 10, "Progress": 80 },
    "DBA-1188: Foundations marcar depósitos e retiradas com flag NRA": { "Stories": 7, "Story Points": 63, "Progress": 66},
    "DBA-1745: Foundations Expired PIX Certificates": { "Stories": 0, "Story Points": 15, "Progress": 66 },
    "DBA-1610: Settlement Consulta de Ajustes": { "Stories": 2, "Story Points": 13, "Progress": 0 },
    "DBA-1782: Expor Documentação Open API": { "Stories": 2, "Story Points": 10, "Progress": 0 }
};

const velocity = {
    "DBA-2025SP33": {"commited": 53, "completed": 65},
    "DBA-2025SP34": {"commited": 77, "completed": 74},
    "DBA-2025SP35": {"commited": 66, "completed": 68},
    "DBA-2526SP1": {"commited": 65, "completed": 89.5},
    "DBA-2526SP2": {"commited": 31.5, "completed": 50.5},
    "DBA-2526SP3": {"commited": 56, "completed": 86},
    "DBA-2526SP4": {"commited": 51, "completed": 60},
}
