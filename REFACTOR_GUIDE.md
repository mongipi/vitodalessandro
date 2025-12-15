# Frontend Refactor - Guida Implementazione

## ✅ Completato

### 1. **Centralizzazione Costanti** (`src/config/config.js`)
- URLs API Strapi e externe (Santo del Giorno)
- Endpoints centralizzati
- Messaggi errore standardizzati
- Timeout e retry configuration

### 2. **API Client Refactor** (`src/api/client.js`)
- `APIError` class personalizzata per errori
- Timeout automatico con AbortController
- Error handling centralizzato
- `fetchStrapiJSON()` helper per response JSON

### 3. **API Endpoints Refactor**
- `articoli.js` - getAllArticoli, getArticoloById
- `categorie.js` - getAllCategorie
- `farmacie.js` - getFarmaciaTurno, getAllFarmacie
- `iniziative.js` - getAllIniziative, getIniziativaById
- `santo.js` - getSantoDelGiorno

**Tutti con:**
- Try/catch error handling
- Validazione input
- JSDoc comments
- Uso config centralizzate

### 4. **Custom Hooks** (`src/hooks/useFetch.js`)
```javascript
// Hook generico
useFetch(asyncFunction, dependencies, cacheTime)

// Hook specializzati
useArticoli()
useArticoloById(id)
useCategorie()
useFarmacie()
useFarmaciaTurno()
useIniziative()
useSantoDelGiorno()
```

**Features:**
- Caching configurabile
- Loading/error states
- Retry function automatica
- Dependency tracking

### 5. **Componenti UI Riutilizzabili** (`src/components/UIElements.jsx`)
- `LoadingSpinner` - Spinner personalizzato
- `ErrorAlert` - Alert errori con retry
- `LoadingContainer` - Container generico
- `ArticleSkeletonLoader` - Skeleton per articoli
- `EmptyState` - Messaggi empty

### 6. **Refactor Componenti**
- `blog.js` - Aggiunto EmptyState, limite articoli, keys fixing

---

## 🚀 Prossimi Step (To-Do)

### 1. **Refactor Index Moderna (index-modern.js)**
```javascript
import { useArticoli, useSantoDelGiorno, useFarmaciaTurno } from "../hooks/useFetch";
import { LoadingContainer, LoadingSpinner, ErrorAlert } from "../components/UIElements";

export default function IndexModern() {
    const { data: articoli, loading: articoliLoading, error: articoliError, retry: retryArticoli } = useArticoli();
    const { data: santo, loading: santoLoading } = useSantoDelGiorno();
    
    return (
        <>
            <Navbar ... />
            {/* Hero section */}
            {/* Chi sono */}
            {/* Blog section */}
            <LoadingContainer loading={articoliLoading} error={articoliError} onRetry={retryArticoli}>
                <Blog articoli={articoli?.data || []} />
            </LoadingContainer>
            {/* Rest */}
        </>
    );
}
```

### 2. **Refactor Info Page (info.js)**
Usa `useSantoDelGiorno()` e `useFarmaciaTurno()` invece di fetch manuali

### 3. **Refactor Page Blog Detail**
Usa `useArticoloById(id)` per il fetching

### 4. **Refactor Pagine Iniziative**
Usa `useIniziative()` hook

### 5. **Context API per Stati Globali** (opzionale)
```javascript
// src/context/AppContext.js
- Theme (dark/light)
- User preferences
- Loading state globale
```

### 6. **Error Boundary**
```javascript
// src/components/ErrorBoundary.jsx
class ErrorBoundary extends React.Component { ... }
// Wrappa <App /> in index.js
```

---

## 📋 Linee Guida Refactor Componenti

### Pattern da seguire:

```javascript
import { useFetch } from "../hooks/useFetch";
import { LoadingContainer, EmptyState } from "../components/UIElements";

export default function MyPage() {
    // 1. Usa custom hook per data
    const { data, loading, error, retry } = useArticoli();
    
    // 2. Renderizza con LoadingContainer
    return (
        <LoadingContainer loading={loading} error={error} onRetry={retry}>
            {data?.data?.length > 0 ? (
                <MyComponent items={data.data} />
            ) : (
                <EmptyState message="Nessun dato" />
            )}
        </LoadingContainer>
    );
}
```

### NO ❌:
```javascript
const [data, setData] = useState(null);
useEffect(() => {
    fetchData().then(r => setData(r.json()));
}, []);
```

### SÌ ✅:
```javascript
const { data, loading, error } = useArticoli();
```

---

## 🔧 Cartelle Nuove

```
src/
  config/
    config.js          ← Costanti centralizzate
  hooks/
    useFetch.js        ← Custom hooks per data fetching
  components/
    UIElements.jsx     ← Componenti riutilizzabili
```

---

## 📚 JSDoc Comments

Tutti gli API functions hanno JSDoc:
```javascript
/**
 * Recupera tutti gli articoli pubblicati
 * @returns {Promise<Object>} Lista articoli
 * @throws {APIError}
 */
export async function getAllArticoli() { ... }
```

---

## 🧪 Testing

### Test API client:
```javascript
// Verifica error handling
await fetchStrapiJSON("/invalid").catch(e => {
    console.assert(e instanceof APIError);
});
```

### Test custom hooks:
```javascript
const { result } = renderHook(() => useArticoli());
// Attendi loading
// Verifica data
```

---

## 💡 Tips

1. **Sempre usare custom hooks** per data fetching
2. **Centralizzare error messages** in config.js
3. **Aggiungere fallback** per dati mancanti
4. **Validare input** alle API calls
5. **Usare LoadingContainer** per consistenza UX

---

## 📞 Prossimo Refactor

Vuoi che continui con:
1. ✅ Refactor tutte le pagine (index, blog-detail, ecc)?
2. ✅ Error Boundary component?
3. ✅ Context API per stati globali?
4. ✅ Cleanup `components/client.js` (probabile dead code)?

Dimmi dove vuoi procedere! 🚀
