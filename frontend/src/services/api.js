import rawFormations from '../data/formations.json';

const AUTH_TOKEN_KEY = 'admin_token';
const AUTH_USER_KEY = 'admin_user';
const STORAGE_FORMATIONS_KEY = 'iti_static_formations';
const STORAGE_INSCRIPTIONS_KEY = 'iti_static_inscriptions';
const staticDelayMs = 220;

const sleep = (delay = staticDelayMs) =>
    new Promise((resolve) => setTimeout(resolve, delay));

const response = (data) => ({ data: { data } });

const categoriesSeed = [
    { id: 'cat-diplome', name: 'Diplôme' },
    { id: 'cat-continue', name: 'Formations continues' },
    { id: 'cat-pratique', name: 'Formations pratiques' }
];

const toInitialFormations = () =>
    rawFormations.map((item, index) => {
        const category =
            categoriesSeed.find((cat) => cat.name === item.category) ||
            categoriesSeed[0];

        return {
            id: item.id,
            title: item.title,
            description: item.description,
            duration: item.duration || '3 mois',
            condition: item.subCategory || 'Niveau bac ou expérience équivalente',
            category,
            image:
                item.image ||
                'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop',
            opportunities: item.opportunities || [],
            created_at: new Date(Date.now() - index * 86400000).toISOString()
        };
    });

const makeSeedInscriptions = (formations) => [
    {
        id: 'ins-001',
        name: 'Yassine El Idrissi',
        email: 'yassine.elidrissi@example.com',
        phone: '+212 600 123 456',
        formation: { id: formations[0].id, title: formations[0].title },
        message: 'Je souhaite en savoir plus sur les horaires du soir.',
        created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
        id: 'ins-002',
        name: 'Sara Benali',
        email: 'sara.benali@example.com',
        phone: '+212 622 987 100',
        formation: { id: formations[1].id, title: formations[1].title },
        message: 'Je suis disponible pour un entretien cette semaine.',
        created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: 'ins-003',
        name: 'Adam Naciri',
        email: 'adam.naciri@example.com',
        phone: '+212 650 555 101',
        formation: { id: formations[2].id, title: formations[2].title },
        message: '',
        created_at: new Date().toISOString()
    }
];

const readLocalJson = (key, fallbackFactory) => {
    const cached = localStorage.getItem(key);
    if (cached) return JSON.parse(cached);
    const initial = fallbackFactory();
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
};

const writeLocalJson = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getFormationsStore = () =>
    readLocalJson(STORAGE_FORMATIONS_KEY, () => toInitialFormations());

const setFormationsStore = (formations) =>
    writeLocalJson(STORAGE_FORMATIONS_KEY, formations);

const getInscriptionsStore = () =>
    readLocalJson(STORAGE_INSCRIPTIONS_KEY, () => makeSeedInscriptions(getFormationsStore()));

const setInscriptionsStore = (inscriptions) =>
    writeLocalJson(STORAGE_INSCRIPTIONS_KEY, inscriptions);

const buildStats = (inscriptions) => {
    const today = new Date().toISOString().slice(0, 10);
    const total = inscriptions.length;
    const todayCount = inscriptions.filter((item) => item.created_at.slice(0, 10) === today).length;

    const groupedByFormation = inscriptions.reduce((acc, item) => {
        const formationTitle = item.formation?.title || 'Autres';
        acc[formationTitle] = (acc[formationTitle] || 0) + 1;
        return acc;
    }, {});

    const byFormation = Object.entries(groupedByFormation)
        .map(([formation, count]) => ({ formation, count }))
        .sort((a, b) => b.count - a.count);

    const overTime = Array.from({ length: 14 }).map((_, i) => {
        const day = new Date();
        day.setDate(day.getDate() - (13 - i));
        const isoDate = day.toISOString().slice(0, 10);
        const count = inscriptions.filter((item) => item.created_at.slice(0, 10) === isoDate).length;
        return { date: isoDate, count };
    });

    return { total, today: todayCount, byFormation, overTime };
};

export const authService = {
    login: async ({ email, password }) => {
        await sleep();
        const isValid = email === 'admin@iti.ma' && password === 'admin123';
        if (!isValid) {
            throw new Error('Identifiants invalides. Utilisez admin@iti.ma / admin123');
        }
        const user = { name: 'Direction ITI', email: 'admin@iti.ma', role: 'admin' };
        localStorage.setItem(AUTH_TOKEN_KEY, 'static-admin-token');
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        return { token: 'static-admin-token', user };
    },
    logout: async () => {
        await sleep(100);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
    },
    getCurrentUser: () => {
        const user = localStorage.getItem(AUTH_USER_KEY);
        return user ? JSON.parse(user) : null;
    },
    isAuthenticated: () => !!localStorage.getItem(AUTH_TOKEN_KEY)
};

export const formationService = {
    getAll: async () => {
        await sleep();
        return response(getFormationsStore());
    },
    getById: async (id) => {
        await sleep();
        const formation = getFormationsStore().find((item) => String(item.id) === String(id)) || null;
        return response(formation);
    }
};

export const categoryService = {
    getAll: async () => {
        await sleep();
        return response(categoriesSeed);
    }
};

export const inscriptionService = {
    create: async (data) => {
        await sleep();
        const formations = getFormationsStore();
        const selected = formations.find((item) => String(item.id) === String(data.formation_id));
        const inscriptions = getInscriptionsStore();
        inscriptions.unshift({
            id: `ins-${Date.now()}`,
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message || '',
            formation: selected ? { id: selected.id, title: selected.title } : null,
            created_at: new Date().toISOString()
        });
        setInscriptionsStore(inscriptions);
        return response({ success: true });
    }
};

export const contactService = {
    create: async (data) => {
        await sleep();
        console.info('[Mock contact form]', data);
        return response({ success: true });
    }
};

export const adminService = {
    getInscriptions: async () => {
        await sleep();
        return response(getInscriptionsStore());
    },
    getStats: async () => {
        await sleep();
        return response(buildStats(getInscriptionsStore()));
    },
    exportCsv: async () => {
        await sleep();
        const rows = getInscriptionsStore();
        const header = 'Nom,Email,Telephone,Formation,Date\n';
        const body = rows
            .map((item) =>
                `"${item.name}","${item.email}","${item.phone}","${item.formation?.title || ''}","${item.created_at}"`
            )
            .join('\n');
        return { data: `${header}${body}` };
    },
    getFormations: async () => {
        await sleep();
        return response(getFormationsStore());
    },
    createFormation: async (data) => {
        await sleep();
        const formations = getFormationsStore();
        const category = categoriesSeed.find((cat) => cat.id === data.category_id) || categoriesSeed[0];
        const newFormation = {
            id: `form-${Date.now()}`,
            title: data.title,
            description: data.description,
            duration: data.duration,
            condition: data.condition,
            category,
            image:
                data.image ||
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
            opportunities: [],
            created_at: new Date().toISOString()
        };
        formations.unshift(newFormation);
        setFormationsStore(formations);
        return response(newFormation);
    },
    updateFormation: async (id, data) => {
        await sleep();
        const formations = getFormationsStore();
        const category = categoriesSeed.find((cat) => cat.id === data.category_id) || categoriesSeed[0];
        const next = formations.map((item) =>
            String(item.id) === String(id)
                ? {
                      ...item,
                      title: data.title,
                      description: data.description,
                      duration: data.duration,
                      condition: data.condition,
                      image: data.image || item.image,
                      category
                  }
                : item
        );
        setFormationsStore(next);
        return response(true);
    },
    deleteFormation: async (id) => {
        await sleep();
        const formations = getFormationsStore().filter((item) => String(item.id) !== String(id));
        setFormationsStore(formations);
        return response(true);
    }
};
