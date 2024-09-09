const _storage = window.localStorage
const prefix = 'app'
import sectorRoutes from './sectorRoutes';

const codificar = (value) => {
  if (process.env.NODE_ENV === 'development') return value

  return window.btoa(value)
}

const decodificar = (value) => {
  if (process.env.NODE_ENV === 'development') return value

  return window.atob(value)
}

const guardLogin = (to, from, next) => {
  const menu = _storage.getItem(codificar(`${prefix}_menu`))
  if (_storage.getItem(codificar(`${prefix}_token`)) && menu && _storage.getItem(codificar(`${prefix}_usuario`))) {
    if (from.path.includes('/app/')) {
      next({ path: `${JSON.parse(decodificar(menu))[0].ruta}`, replace: true })
    } else {
      next({ path: `/app/${JSON.parse(decodificar(menu))[0].ruta}`, replace: true })
    }
  } else {
    next()
  }
}

const guardApp = (to, from, next) => {
  if (_storage.getItem(codificar(`${prefix}_token`))) {
    next()
  } else {
    _storage.clear()
    next('/')
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/OutLoginLayout.vue'),
    beforeEnter: guardLogin,
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/app/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: guardApp,
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/Dashboard.vue'), meta: { title: 'Dashboard' }},
      { path: 'entidades', name: 'entidades', component: () => import('pages/Entidades.vue'), meta: { title: 'Entidades' }},
      { path: 'menus', name: 'menus', component: () => import('pages/Menus.vue'), meta: { title: 'Menus' }},
      { path: 'roles', name: 'roles', component: () => import('pages/Roles.vue'), meta: { title: 'Roles' }},
      { path: 'usuarios', name: 'usuarios', component: () => import('pages/Usuarios.vue'), meta: { title: 'Usuarios' }},
      { path: 'parametros', name: 'parametros', component: () => import('pages/Parametros.vue'), meta: { title: 'Parametros' }},
      { path: 'departamentos', name: 'departamentos', component: () => import('pages/DepartamentosForm.vue'), meta: { title: 'Departamentos' }},
      { path: 'provincias', name: 'provincias', component: () => import('pages/Provincias.vue'), meta: { title: 'Provincias' }},
      { path: 'municipios', name: 'municipios', component: () => import('src/pages/Municipios.vue'), meta: { title: 'Municipios' }},
      { path: 'empresas-constructoras', name: 'empresas-constructoras', component: () => import('pages/EmpConstructora.vue'), meta: { title: 'Empresas Constructoras' }},
      { path: 'sectores', name: 'sectores', component: () => import('pages/SectoresForm.vue'), meta: { title: 'Sectores' }},
      { path: 'ministerios', name: 'ministerios', component: () => import('pages/MinisteriosForm.vue'), meta: { title: 'Ministerios' }},
      { path: 'descentralizadas', name: 'descentralizadas', component: () => import('pages/Decentralizadas.vue'), meta: { title: 'Descentralizadas' }},
      { path: 'viceministerios', name: 'viceministerios', component: () => import('pages/Viceministerios.vue'), meta: { title: 'Viceministerios' }},
      { path: 'ejecutores', name: 'ejecutores', component: () => import('pages/Ejecutores.vue'), meta: { title: 'Ejecutores' }},
      { path: 'interoperabilidad', name: 'interoperabilidad', component: () => import('pages/Interoperabilidad.vue'), meta: { title: 'Interoperabilidad' }},
      { path: 'estados', name: 'estados', component: () => import('pages/EstadosForm.vue'), meta: { title: 'Estados' }},
      { path: 'estados-detalles', name: 'estados-detalles', component: () => import('pages/EstadosDetalleForm.vue'), meta: { title: 'Estados Detalles' }},
      { path: 'cargos', name: 'cargos', component: () => import('pages/CargoForm.vue'), meta: { title: 'Cargos' }},
      { path: 'programas', name: 'programas', component: () => import('pages/Programas.vue'), meta: { title: 'Programas' }},
      { path: 'permisos', name: 'permisos', component: () => import('pages/PermisosForm.vue'), meta: { title: 'Permisos' }},
      { path: 'co-ejecutores', name: 'co-ejecutores', component: () => import('pages/CoEjecutoras.vue'), meta: { title: 'Co-Ejecutores' }},
      { path: 'OrganismosFinanciadores', name: 'OrganismosFinanciadores', component: () => import('src/pages/OrganismosFinanciadores.vue'), meta: { title: 'Organismos Financiadores' }},
      { path: 'menuroles', name: 'menuroles', component: () => import('pages/MenuRoles.vue'), meta: { title: 'Menu Roles' }},
      { path: 'menugroup', name: 'menugroup', component: () => import('pages/MenuGroup.vue'), meta: { title: 'Menu Group' }},
      { path: 'contraparte', name: 'contraparte', component: () => import('pages/Contraparte.vue'), meta: { title: 'Contraparte' }},
      { path: 'lugar', name: 'lugar', component: () => import('pages/Lugar.vue'), meta: { title: 'Lugar' }},
      { path: 'ucep', name: 'ucep', component: () => import('pages/Ucep.vue'), meta: { title: 'UCEP' }},
      { path: 'tipo-proyecto', name: 'tipo-proyecto', component: () => import('pages/TipoProyecto.vue'), meta: { title: 'Tipo Proyecto' }},
      { path: 'tipos-financiamiento', name: 'tipos-financiamiento', component: () => import('pages/TiposFinanciadores.vue'), meta: { title: 'Tipos de Financiamiento' }},
      { path: 'proyectos', name: 'proyectos', component: () => import('pages/Proyectos.vue'), meta: { title: 'Proyectos' }},
      { path: 'proyectos/:proyectoId', name: 'proyecto-detalle', component: () => import('pages/ProyectoDetalle.vue'), meta: { title: 'Proyecto Detalle' }},
      { path: 'proyecto', name: 'nuevo-proyecto', component: () => import('pages/ProyectoDetalle.vue'), meta: { title: 'Proyecto Detalle' }},
      { path: 'ficha-ejecucion/:realizacion_id', name: 'FichaEjecucion', component: () => import('pages/FichaEjecucion.vue'), props: true, meta: { title: 'Ficha Ejecución' }},
      { path: 'programa-objetivos/:programa_id', name: 'programa-objetivos', component: () => import('src/pages/ObjetivosPrograma.vue'), props: true, meta: { title: 'Programa Objetivos' }},
      { path: 'preinversion-metas/:preinversion_id', name: 'preinversion-metas', component: () => import('src/pages/MetasPreinversion.vue'), props: true, meta: { title: 'Preinversión Metas' }},
      { path: 'logs', name: 'Logs', component: () => import('pages/Logs.vue'), meta: { title: 'Logs' }},
      { path: 'FichaSeguimiento/:seguimiento_id', name: 'FichaSeguimiento', component: () => import('pages/FichaSeguimiento.vue'), meta: { title: 'Ficha Seguimiento' }},
      { path: 'preinversiones', name: 'preinversiones', component: () => import('src/pages/PreInversion.vue'), meta: { title: 'Preinversiones' }},
      { path: 'seguimiento-proyectos', name: 'seguimiento-proyectos', component: () => import('pages/seguimiento-proyectos.vue'), meta: { title: 'Seguimiento Proyectos' }},
      { path: 'seguimiento-proyectosa', name: 'seguimiento-proyectos-admin', component: () => import('pages/SeguimientoProyectosAdmin.vue'), meta: { title: 'Seguimiento Proyectos Admin' }},
      ...sectorRoutes,
    ]
    
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
