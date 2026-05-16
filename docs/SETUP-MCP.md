# 🚀 Setup MCP per Fovea AI Ads Manager

## MCP da Configurare sul TUO Claude Desktop

### 1. **Meta Ads MCP (Ufficiale Claude)**
```json
{
  "mcpServers": {
    "meta-ads": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-meta-ads"]
    }
  }
}
```

### 2. **Higgsfield MCP per Creative AI**
```json
{
  "mcpServers": {
    "higgsfield": {
      "command": "npx",
      "args": ["-y", "@higgsfield/mcp-server"]
    }
  }
}
```

## Configurazione Claude Desktop

1. **Apri Claude Desktop**
2. **Vai in Settings → MCP**
3. **Aggiungi i 2 MCP sopra**
4. **Restart Claude Desktop**

## Connessione Account Meta

Con l'MCP ufficiale Claude:
- **Non serve creare app Meta**
- **Non serve approval process**
- **Claude gestisce tutto automaticamente**

Gli utenti potranno connettere i loro account Meta direttamente tramite Claude!

## API Keys Necessarie

Solo **1 chiave API**:
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxx  # LA TUA chiave Claude
```

## Come Funziona

1. **Fovea** → **Claude API** (con TUO account)
2. **Claude API** → **I TUOI MCP** (Meta + Higgsfield)
3. **MCP Meta** → **Account Meta dell'utente** (OAuth gestito da Claude)
4. **MCP Higgsfield** → **Creative AI** (TUO account Higgsfield)

## Costi Finali

- **Claude API**: €0.02 per campagna completa
- **MCP Meta**: Gratis (ufficiale Claude)
- **Higgsfield**: TUO abbonamento esistente
- **Totale**: €0.02 per workflow completo

## Test

Una volta configurati gli MCP, testa nel TUO Claude Desktop:
```
"Create a Meta Ads campaign for a business coaching service"
```

Se funziona, Fovea userà gli stessi MCP automaticamente!