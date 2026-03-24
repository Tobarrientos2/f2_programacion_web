-- Configuración básica
vim.opt.termguicolors = true
vim.opt.number = true
vim.opt.relativenumber = true

-- Tema Tokyo Night (estilo VS Code oscuro)
-- Si no está instalado, usar fallback
local ok, _ = pcall(require, "tokyonight")
if ok then
  vim.cmd([[colorscheme tokyonight-moon]])
else
  -- Fallback si no hay plugin
  vim.cmd([[colorscheme desert]])
end

-- Abrir archivo actual en el navegador (macOS)
vim.api.nvim_set_keymap("n", "<leader>o", ":!open %<CR>", { noremap = true, silent = true })

-- Servir archivos con Python HTTP server y abrir en navegador
vim.api.nvim_set_keymap("n", "<leader>s", ":!python3 -m http.server 8000 &> /dev/null & sleep 1 && open http://localhost:8000<CR>", { noremap = true, silent = true })

-- Instalar plugin manager y tema automáticamente
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git", "clone", "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", lazypath
  })
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({
  { "folke/tokyonight.nvim", lazy = false, priority = 1000 },
})
