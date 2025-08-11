export const ManagementFooter = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50">
      <div className="px-6 py-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">c</span>
          </div>
          <p className="text-sm font-semibold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
            © 2025 ConcentIT A.Ş.
          </p>
        </div>
        <p className="text-xs text-gray-500">Yönetim modülü • Tüm hakları saklıdır</p>
      </div>
    </footer>
  )
}


