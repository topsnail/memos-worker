// src/index.js - 已同步主题版本

// 主页面HTML内容 - 使用与index.html相同的主题参数
const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>在线留言板</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💬</text></svg>">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'fb-blue': '#618ea5',
                        'fb-blue-dark': '#70887d',
                        'fb-bg': '#CCCCCC',
                        'fb-gray': '#65676B',
                        'fb-gray-light': '#E4E6EB',
                    }
                }
            }
        }
    </script>
    
    <!-- ====== 同步index.html的CSS样式 ====== -->
    <style>
        /* 1. 动态渐变背景 */
        body {
            background: linear-gradient(-45deg, #4a6d7c, #8da383, #8a6a9c, #d18a66, #147a61);
            background-attachment: fixed;
            background-size: 400% 400%;
            min-height: 100vh;
            animation: gradientBG 20s ease infinite;
        }
        
        @keyframes gradientBG {
            0% { background-position: 0% 50%; opacity: 0.98; }
            50% { background-position: 100% 50%; opacity: 1; }
            100% { background-position: 0% 50%; opacity: 0.98; }
        }
        
        /* 2. 毛玻璃容器样式 */
        .glass-container {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 16px;
            box-shadow: 
                0 12px 30px rgba(0, 0, 0, 0.1),
                0 0 0 1px rgba(255, 255, 255, 0.15) inset;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* 3. 标题样式 */
        .page-title {
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* 4. 留言卡片背景透明度 */
        .bg-fb-bg {
            background: rgba(240, 242, 245, 0.7) !important;
        }
        
        /* 5. 悬停效果 */
        .hover\\:bg-gray-100:hover {
            background: rgba(243, 244, 246, 0.9) !important;
        }
        
        /* 6. 小屏幕适配 */
        @media (max-width: 768px) {
            .glass-container {
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                padding: 16px !important;
            }
            body {
                animation-duration: 30s;
                padding: 12px !important;
            }
            
            input, textarea {
                font-size: 16px !important;
                max-width: 100% !important;
            }
            
            .reply-form-container .flex {
                flex-direction: column !important;
                gap: 8px !important;
            }
            
            .reply-form-container input[type="email"] {
                width: 100% !important;
            }
            
            .reply-form-container button {
                width: 100% !important;
            }
            
            .bg-fb-bg {
                padding: 12px !important;
            }
            
            .flex.items-start.gap-3 {
                gap: 12px !important;
            }
            
            .ml-13 {
                margin-left: 10px !important;
            }
        }
        
        /* 7. 超小屏幕优化 */
        @media (max-width: 480px) {
            body {
                padding: 8px !important;
            }
            
            .glass-container {
                padding: 12px !important;
            }
            
            .header-text {
                font-size: 1.5rem !important;
            }
            
            .subheader-text {
                font-size: 0.875rem !important;
            }
            
            .reply-form-container input,
            .reply-form-container textarea {
                padding: 10px !important;
            }
        }
        
        /* 8. 备用方案 */
        @supports not (backdrop-filter: blur(8px)) {
            .glass-container {
                background: rgba(255, 255, 255, 0.95) !important;
            }
        }
        
        /* 9. 抗锯齿和文本溢出 */
        body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .text-base {
            word-break: break-word;
            overflow-wrap: break-word;
        }
    </style>
</head>
<body class="min-h-screen p-4 md:p-3">
    <!-- 标题独立在容器外 -->
    <div class="max-w-4xl mx-auto text-center mb-2 md:mb-2">
        <h1 class="page-title header-text text-2xl md:text-4xl font-bold text-white mb-2">
            在线留言板
        </h1>
        <p class="page-title subheader-text text-gray-600 text-sm md:text-base">分享你的想法和反馈</p>
    </div>
    
    <!-- 留言表单容器 -->
    <div class="max-w-4xl mx-auto mb-6 md:mb-3">
        <div class="glass-container p-4 md:p-8">
            <div id="notification"></div>
            <form id="messageForm" class="space-y-4">
                <div>
                    <label for="content" class="block text-sm font-medium text-gray-500 mb-2">留言内容</label>
                    <textarea id="content" name="content" required rows="4" placeholder="分享你的想法..."
                        class="w-full px-3 py-2 border border-fb-gray-light rounded-lg bg-fb-bg focus:bg-white focus:outline-none focus:ring-2 focus:ring-fb-blue focus:border-transparent transition-all resize-none text-base"></textarea>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
                    <input type="email" id="email" name="email" required placeholder="your@email.com"
                        class="w-full px-3 py-2 border border-fb-gray-light rounded-lg bg-fb-bg focus:bg-white focus:outline-none focus:ring-2 focus:ring-fb-blue focus:border-transparent transition-all text-base">
                </div>
                <button type="submit"
                    class="w-full bg-fb-blue hover:bg-fb-blue-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-base">
                    发送留言
                </button>
            </form>
        </div>
    </div>

    <!-- 所有留言容器 -->
    <div class="max-w-4xl mx-auto">
        <div class="glass-container p-4 md:p-8">
            <h2 class="text-xl md:text-xl font-bold text-gray-600 mb-2">所有留言</h2>
            <div id="messagesList">
                <div class="text-center text-fb-gray py-8">加载中...</div>
            </div>
        </div>
    </div>

    <script>
        const API_URL = '/api';

        async function loadMessages() {
            try {
                const response = await fetch(API_URL + '/messages');
                const data = await response.json();

                const messagesList = document.getElementById('messagesList');

                if (!data.messages || data.messages.length === 0) {
                    messagesList.innerHTML = '<div class="text-center text-fb-gray py-12 text-sm">暂无留言，成为第一个留言的人吧！</div>';
                    return;
                }

                messagesList.innerHTML = data.messages.map(msg => {
                    return '<div class="bg-fb-bg rounded-lg p-3 md:p-4 mb-3 hover:bg-gray-100 transition-colors">' +
                        '<div class="flex items-start gap-3 mb-2">' +
                        '<img src="' + getGravatarUrl(msg.email, 40) + '" alt="' + escapeHtml(msg.email) + '的头像" class="w-10 h-10 rounded-full flex-shrink-0" onerror="this.src=\\'https://ui-avatars.com/api/?name=User&size=40&background=618ea5&color=fff&bold=true&length=1\\'">' +
                        '<div class="flex-1 min-w-0">' +
                        '<div class="text-gray-900 text-base leading-relaxed break-words">' + escapeHtml(msg.content) + '</div>' +
                        '<div class="flex flex-wrap items-center gap-2 text-xs text-fb-gray mt-1">' +
                        '<span class="font-medium truncate max-w-[120px] md:max-w-none">' + escapeHtml(msg.email) + '</span>' +
                        '<span>·</span>' +
                        '<span>' + formatDate(msg.created_at) + '</span>' +
                        '<span>·</span>' +
                        '<button onclick="showReplyForm(' + msg.id + ')" class="text-fb-blue hover:underline cursor-pointer whitespace-nowrap">回复</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        
                        '<div id="reply-form-' + msg.id + '" class="reply-form-container mt-3 hidden ml-10 md:ml-13">' +
                        '<div class="flex flex-col md:flex-row md:items-center gap-2">' +
                        '<input type="text" id="reply-content-' + msg.id + '" placeholder="输入回复内容..." class="flex-1 px-3 py-2 border border-fb-gray-light rounded-lg bg-fb-bg focus:outline-none focus:ring-1 focus:ring-fb-blue text-sm md:text-base">' +
                        '<input type="email" id="reply-email-' + msg.id + '" placeholder="你的邮箱" class="w-full md:w-40 px-3 py-2 border border-fb-gray-light rounded-lg bg-fb-bg focus:outline-none focus:ring-1 focus:ring-fb-blue text-sm md:text-base">' +
                        '<button onclick="submitReply(' + msg.id + ')" class="bg-fb-blue hover:bg-fb-blue-dark text-white px-4 py-2 rounded-lg text-sm md:text-base whitespace-nowrap">发送回复</button>' +
                        '</div>' +
                        '</div>' +
                        
                        '<div id="replies-' + msg.id + '" class="mt-2 ml-10 md:ml-13 border-l-2 border-fb-gray-light pl-2 md:pl-3"></div>' +
                        '</div>';
                }).join('');

                data.messages.forEach(msg => {
                    loadReplies(msg.id);
                });
            } catch (error) {
                console.error('加载留言失败:', error);
                document.getElementById('messagesList').innerHTML = '<div class="bg-red-50 text-red-600 p-3 rounded-lg text-sm">加载留言失败，请刷新页面重试</div>';
            }
        }

        async function loadReplies(messageId) {
            try {
                const response = await fetch(API_URL + '/messages/' + messageId + '/replies');
                if (!response.ok) return;
                
                const data = await response.json();
                const repliesContainer = document.getElementById('replies-' + messageId);
                
                if (!data.replies || data.replies.length === 0) {
                    repliesContainer.innerHTML = '';
                    return;
                }

                repliesContainer.innerHTML = data.replies.map(reply => {
                    const adminBadge = reply.is_admin_reply ? '<span class="text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded text-xs">管理员</span>' : '';
                    return '<div class="mb-2 pb-2 border-b border-fb-gray-light last:border-0">' +
                        '<div class="flex items-start gap-2 mb-1">' +
                        '<img src="' + getGravatarUrl(reply.email, 32) + '" alt="' + escapeHtml(reply.email) + '的头像" class="w-8 h-8 rounded-full flex-shrink-0" onerror="this.src=\\'https://ui-avatars.com/api/?name=User&size=32&background=618ea5&color=fff&bold=true&length=1\\'">' +
                        '<div class="flex-1 min-w-0">' +
                        '<div class="text-gray-800 text-sm break-words">' + escapeHtml(reply.content) + '</div>' +
                        '<div class="flex flex-wrap items-center gap-2 text-xs text-fb-gray mt-1">' +
                        adminBadge +
                        '<span class="font-medium truncate max-w-[100px] md:max-w-none">' + escapeHtml(reply.email) + '</span>' +
                        '<span>·</span>' +
                        '<span>' + formatDate(reply.created_at) + '</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }).join('');
            } catch (error) {
                console.error('加载回复失败:', error);
            }
        }

        function showReplyForm(messageId) {
            const form = document.getElementById('reply-form-' + messageId);
            if (form.classList.contains('hidden')) {
                form.classList.remove('hidden');
                const contentInput = document.getElementById('reply-content-' + messageId);
                if (contentInput && window.innerWidth < 768) {
                    setTimeout(() => contentInput.focus(), 100);
                }
            } else {
                form.classList.add('hidden');
            }
        }

        async function submitReply(messageId) {
            const content = document.getElementById('reply-content-' + messageId).value;
            const email = document.getElementById('reply-email-' + messageId).value;
            
            if (!content.trim() || !email.trim()) {
                alert('请填写回复内容和邮箱');
                return;
            }

            try {
                const response = await fetch(API_URL + '/messages/' + messageId + '/replies', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content, email })
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    document.getElementById('reply-content-' + messageId).value = '';
                    document.getElementById('reply-email-' + messageId).value = '';
                    document.getElementById('reply-form-' + messageId).classList.add('hidden');
                    
                    const notification = document.getElementById('notification');
                    
                    notification.innerHTML = '<div class="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm font-medium">回复成功！</div>';
                    await loadReplies(messageId);
                    
                    setTimeout(() => {
                        notification.innerHTML = '';
                    }, 3000);
                } else {
                    const data = await response.json();
                    alert(data.error || '回复失败，请重试');
                }
            } catch (error) {
                console.error('发送回复失败:', error);
                alert('发送失败，请检查网络连接');
            }
        }

        document.getElementById('messageForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = e.target.querySelector('button[type="submit"]');
            const notification = document.getElementById('notification');
            const content = document.getElementById('content').value;
            const email = document.getElementById('email').value;

            submitBtn.disabled = true;
            submitBtn.textContent = '发送中...';
            notification.innerHTML = '';

            try {
                const response = await fetch(API_URL + '/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content, email })
                });

                const data = await response.json();

                if (response.ok) {
                    notification.innerHTML = '<div class="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm font-medium">留言发送成功！</div>';
                    document.getElementById('messageForm').reset();
                    await loadMessages();
                    setTimeout(() => {
                        notification.innerHTML = '';
                    }, 3000);
                } else {
                    notification.innerHTML = '<div class="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">' + (data.error || '发送失败，请重试') + '</div>';
                }
            } catch (error) {
                console.error('发送留言失败:', error);
                notification.innerHTML = '<div class="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">发送失败，请检查网络连接</div>';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = '发送留言';
            }
        });

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function formatDate(dateString) {
            const isoString = dateString.replace(' ', 'T') + 'Z';
            const date = new Date(isoString);
            
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        }

        function getGravatarUrl(email, size = 40) {
            const trimmedEmail = email ? email.trim().toLowerCase() : '';
            
            // 如果没有邮箱或不是邮箱格式，使用UI Avatars生成默认头像
            if (!trimmedEmail || !trimmedEmail.includes('@')) {
                return 'https://ui-avatars.com/api/?name=User&size=' + size + '&background=618ea5&color=fff&bold=true&length=1';
            }
            
            try {
                // 使用邮箱的MD5生成唯一标识
                const md5Hash = CryptoJS.MD5(trimmedEmail).toString();
                // 获取邮箱用户名部分
                const username = trimmedEmail.split('@')[0];
                // 基于邮箱hash生成背景颜色
                const bgColor = md5Hash.substring(0, 6);
                // 使用UI Avatars基于用户名生成头像（更可靠）
                return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(username) + '&size=' + size + '&background=' + bgColor + '&color=fff&bold=true&length=1';
            } catch (error) {
                console.error('生成头像URL失败:', error);
                return 'https://ui-avatars.com/api/?name=User&size=' + size + '&background=618ea5&color=fff&bold=true&length=1';
            }
        }

        loadMessages();
    </script>
</body>
</html>`;

// 管理页面HTML内容保持不变（这里保持不变，只修改主题部分）
const adminHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>留言板管理后台</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💬</text></svg>">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .badge-admin { background-color: #10b981; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: 500; }
    </style>
</head>
<body class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-6xl mx-auto">
        <div id="loginSection" class="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mt-20">
            <h1 class="text-2xl font-bold text-gray-900 mb-6 text-center">管理后台登录</h1>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">管理员密码</label>
                <input type="password" id="adminPassword" placeholder="请输入管理密码"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <button onclick="adminLogin()"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors">
                登录
            </button>
            <p id="loginError" class="text-red-600 text-sm mt-2 hidden">密码错误</p>
        </div>

        <div id="adminPanel" class="hidden">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-900">留言管理</h1>
                <button onclick="logout()" class="text-sm text-gray-600 hover:text-gray-900">退出登录</button>
            </div>

            <div class="flex border-b border-gray-200 mb-6">
                <button onclick="showTab('all')" id="tabAll"
                    class="px-4 py-2 font-medium text-blue-600 hover:text-blue-900 border-b-2 border-blue-500">
                    所有留言
                </button>
                <button onclick="showTab('replies')" id="tabReplies"
                    class="px-4 py-2 font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent ml-2">
                    所有回复
                </button>
            </div>

            <div id="allTab" class="tab-content">
                <h2 class="text-lg font-bold text-gray-900 mb-4">所有留言</h2>
                <div id="allMessages" class="space-y-3"><div class="text-center text-gray-500 py-4">加载中...</div></div>
            </div>
            <div id="repliesTab" class="tab-content hidden">
                <h2 class="text-lg font-bold text-gray-900 mb-4">所有回复</h2>
                <div id="allReplies" class="space-y-3"><div class="text-center text-gray-500 py-4">加载中...</div></div>
            </div>
        </div>
    </div>

    <script>
        if (localStorage.getItem('adminLoggedIn') === 'true') {
            showAdminPanel();
            showTab('all');
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function formatDate(dateString) {
            return new Date(dateString).toLocaleString('zh-CN');
        }

        function adminLogin() {
            const password = document.getElementById('adminPassword').value;
            const errorEl = document.getElementById('loginError');

            fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('adminLoggedIn', 'true');
                    showAdminPanel();
                    showTab('all');
                } else {
                    errorEl.textContent = data.error || '密码错误';
                    errorEl.classList.remove('hidden');
                }
            })
            .catch(error => {
                console.error('登录失败:', error);
                errorEl.textContent = '登录失败，请重试';
                errorEl.classList.remove('hidden');
            });
        }

        function showAdminPanel() {
            document.getElementById('loginSection').classList.add('hidden');
            document.getElementById('adminPanel').classList.remove('hidden');
        }

        function logout() {
            localStorage.removeItem('adminLoggedIn');
            document.getElementById('loginSection').classList.remove('hidden');
            document.getElementById('adminPanel').classList.add('hidden');
            document.getElementById('adminPassword').value = '';
            document.getElementById('loginError').classList.add('hidden');
        }

        function showTab(tabName) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('[id^="tab"]').forEach(el => {
                el.classList.remove('border-blue-500', 'text-blue-600');
            });

            document.getElementById(tabName + 'Tab').classList.remove('hidden');
            const tabBtnId = 'tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1);
            document.getElementById(tabBtnId).classList.add('border-blue-500', 'text-blue-600');

            if (tabName === 'all') loadAllMessages();
            else if (tabName === 'replies') loadAllReplies();
        }

        function loadAllMessages() {
            fetch('/api/admin/messages')
                .then(response => response.json())
                .then(data => {
                    const container = document.getElementById('allMessages');
                    if (data.messages.length === 0) {
                        container.innerHTML = '<div class="text-center text-gray-500 py-4">暂无留言</div>';
                        return;
                    }

                    let html = '';
                    data.messages.forEach(msg => {
                        html += '<div class="bg-white border border-gray-200 rounded-lg p-4">' +
                            '<div class="flex justify-between items-start">' +
                            '<div class="flex-1">' +
                            '<div class="text-gray-900 mb-1">' + escapeHtml(msg.content) + '</div>' +
                            '<div class="text-xs text-gray-500">邮箱: ' + escapeHtml(msg.email) + 
                            ' | 时间: ' + formatDate(msg.created_at) + '</div>' +
                            '</div>' +
                            '<button onclick="deleteMessage(' + msg.id + ')" class="ml-2 text-red-600 hover:text-red-800 text-sm">删除</button>' +
                            '</div>' +
                            '</div>';
                    });
                    container.innerHTML = html;
                })
                .catch(error => {
                    console.error('加载留言失败:', error);
                    document.getElementById('allMessages').innerHTML = '<div class="text-red-600 p-3">加载失败</div>';
                });
        }

        function loadAllReplies() {
            fetch('/api/admin/replies/all')
                .then(response => response.json())
                .then(data => {
                    const container = document.getElementById('allReplies');
                    if (data.replies.length === 0) {
                        container.innerHTML = '<div class="text-center text-gray-500 py-4">暂无回复</div>';
                        return;
                    }

                    let html = '';
                    data.replies.forEach(reply => {
                        const adminBadge = reply.is_admin_reply ? '<span class="badge-admin">管理员</span>' : '';
                        const adminButton = !reply.is_admin_reply ? 
                            '<button onclick="toggleAdminReply(' + reply.id + ')" class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 ml-2">设为管理员回复</button>' : 
                            '<button onclick="toggleAdminReply(' + reply.id + ')" class="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 ml-2">取消管理员标记</button>';
                        
                        html += '<div class="bg-white border border-gray-200 rounded-lg p-4">' +
                            '<div class="flex justify-between items-start">' +
                            '<div class="flex-1">' +
                            '<div class="text-gray-900 mb-1">' + escapeHtml(reply.content) + '</div>' +
                            '<div class="text-xs text-gray-500 mb-2">邮箱: ' + escapeHtml(reply.email) + 
                            ' | 时间: ' + formatDate(reply.created_at) + '<br>回复给留言ID: ' + reply.parent_id + '</div>' +
                            adminBadge +
                            '</div>' +
                            '<div class="flex flex-col gap-1 ml-2">' +
                            '<button onclick="deleteMessage(' + reply.id + ')" class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">删除</button>' +
                            adminButton +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    });
                    container.innerHTML = html;
                })
                .catch(error => {
                    console.error('加载回复失败:', error);
                    document.getElementById('allReplies').innerHTML = '<div class="text-red-600 p-3">加载失败</div>';
                });
        }

        function toggleAdminReply(replyId) {
            if (confirm('切换管理员回复状态？')) {
                updateReplyStatus(replyId, { is_admin_reply: true });
            }
        }

        function updateReplyStatus(replyId, updates) {
            fetch('/api/admin/replies/' + replyId + '/status', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('操作成功');
                    loadAllReplies();
                } else {
                    alert(data.error || '操作失败');
                }
            })
            .catch(error => {
                console.error('操作失败:', error);
                alert('操作失败');
            });
        }

        function deleteMessage(id) {
            if (!confirm('确定要删除吗？')) return;

            fetch('/api/admin/messages/' + id, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('删除成功');
                    const activeTab = document.querySelector('.tab-content:not(.hidden)').id;
                    if (activeTab === 'allTab') loadAllMessages();
                    else if (activeTab === 'repliesTab') loadAllReplies();
                } else {
                    alert(data.error || '删除失败');
                }
            })
            .catch(error => {
                console.error('删除失败:', error);
                alert('删除失败');
            });
        }
    </script>
</body>
</html>`;

// 以下是原始的API处理代码，保持不变
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    try {
      // 主页面
      if (path === '/' || path === '/index.html') {
        return new Response(indexHtml, {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
          },
        });
      }

      // 管理页面
      if (path === '/admin' || path === '/admin.html') {
        return new Response(adminHtml, {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
          },
        });
      }

      // API: 获取所有主留言
      if (path === '/api/messages' && request.method === 'GET') {
        const { results } = await env.DB.prepare(
          'SELECT id, content, email, created_at FROM messages WHERE parent_id IS NULL ORDER BY created_at DESC LIMIT 10'
        ).all();

        return new Response(JSON.stringify({ messages: results }), {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }

      // API: 创建新留言
      if (path === '/api/messages' && request.method === 'POST') {
        const data = await request.json();
        const { content, email } = data;

        if (!content || !email) {
          return new Response(
            JSON.stringify({ error: '留言内容和邮箱不能为空' }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return new Response(
            JSON.stringify({ error: '邮箱格式不正确' }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        }

        if (content.length > 1000) {
          return new Response(
            JSON.stringify({ error: '留言内容不能超过1000个字符' }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        }

        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const result = await env.DB.prepare(
          'INSERT INTO messages (content, email, parent_id, created_at, is_approved, is_admin_reply) VALUES (?, ?, NULL, ?, TRUE, FALSE)'
        )
          .bind(content, email, now)
          .run();

        if (result.success) {
          return new Response(
            JSON.stringify({
              success: true,
              message: '留言发送成功',
            }),
            {
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        } else {
          throw new Error('保存留言失败');
        }
      }

      // API: 获取某条留言的回复
      if (path.match(/^\/api\/messages\/(\d+)\/replies$/) && request.method === 'GET') {
        const match = path.match(/^\/api\/messages\/(\d+)\/replies$/);
        const messageId = match[1];

        const { results } = await env.DB.prepare(
          'SELECT id, content, email, created_at, is_admin_reply FROM messages WHERE parent_id = ? ORDER BY created_at ASC'
        )
          .bind(messageId)
          .all();

        return new Response(JSON.stringify({ replies: results }), {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }

      // API: 创建回复
      if (path.match(/^\/api\/messages\/(\d+)\/replies$/) && request.method === 'POST') {
        const match = path.match(/^\/api\/messages\/(\d+)\/replies$/);
        const messageId = match[1];
        const data = await request.json();
        const { content, email } = data;

        if (!content || !email) {
          return new Response(
            JSON.stringify({ error: '回复内容和邮箱不能为空' }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return new Response(
            JSON.stringify({ error: '邮箱格式不正确' }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        }

        if (content.length > 500) {
          return new Response(
            JSON.stringify({ error: '回复内容不能超过500个字符' }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        }

        const parentMessage = await env.DB.prepare(
          'SELECT id FROM messages WHERE id = ? AND parent_id IS NULL'
        )
          .bind(messageId)
          .first();

        if (!parentMessage) {
          return new Response(
            JSON.stringify({ error: '主留言不存在' }),
            {
              status: 404,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        }

        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const result = await env.DB.prepare(
          'INSERT INTO messages (content, email, parent_id, created_at, is_approved, is_admin_reply) VALUES (?, ?, ?, ?, TRUE, FALSE)'
        )
          .bind(content, email, messageId, now)
          .run();

        if (result.success) {
          return new Response(
            JSON.stringify({
              success: true,
              message: '回复成功！',
              needs_approval: false
            }),
            {
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        } else {
          throw new Error('保存回复失败');
        }
      }

      // 管理登录API
      if (path === '/api/admin/login' && request.method === 'POST') {
        const data = await request.json();
        const { password } = data;
        
        // 从Cloudflare Dashboard环境变量读取密码
        if (password === env.ADMIN_PASSWORD) {
          return new Response(
            JSON.stringify({ success: true }),
            {
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        } else {
          return new Response(
            JSON.stringify({ success: false, error: '密码错误' }),
            {
              status: 401,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        }
      }

      // 获取所有留言（管理用）
      if (path === '/api/admin/messages' && request.method === 'GET') {
        const { results } = await env.DB.prepare(
          'SELECT id, content, email, created_at FROM messages WHERE parent_id IS NULL ORDER BY created_at DESC'
        ).all();

        return new Response(JSON.stringify({ messages: results }), {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }

      // 获取所有回复（管理用）
      if (path === '/api/admin/replies/all' && request.method === 'GET') {
        const { results } = await env.DB.prepare(
          'SELECT id, content, email, parent_id, created_at, is_admin_reply FROM messages WHERE parent_id IS NOT NULL ORDER BY created_at DESC'
        ).all();

        return new Response(JSON.stringify({ replies: results }), {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }

      // 更新回复状态（只保留管理员标记功能）
      if (path.match(/^\/api\/admin\/replies\/(\d+)\/status$/) && request.method === 'PUT') {
        const match = path.match(/^\/api\/admin\/replies\/(\d+)\/status$/);
        const replyId = match[1];
        const data = await request.json();
        
        // 只允许更新管理员标记状态
        if (data.is_admin_reply === undefined) {
          return new Response(
            JSON.stringify({ error: '只能更新管理员标记状态' }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        }
        
        const result = await env.DB.prepare(
          'UPDATE messages SET is_admin_reply = ? WHERE id = ?'
        )
          .bind(data.is_admin_reply ? 1 : 0, replyId)
          .run();

        if (result.success) {
          return new Response(
            JSON.stringify({ success: true, message: '更新成功' }),
            {
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        } else {
          throw new Error('更新失败');
        }
      }

      // 删除留言或回复
      if (path.match(/^\/api\/admin\/messages\/(\d+)$/) && request.method === 'DELETE') {
        const match = path.match(/^\/api\/admin\/messages\/(\d+)$/);
        const messageId = match[1];

        const result = await env.DB.prepare(
          'DELETE FROM messages WHERE id = ?'
        )
          .bind(messageId)
          .run();

        if (result.success) {
          return new Response(
            JSON.stringify({ success: true, message: '删除成功' }),
            {
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        } else {
          throw new Error('删除失败');
        }
      }

      // 404 Not Found
      return new Response('Not Found', {
        status: 404,
        headers: corsHeaders,
      });
      
    } catch (error) {
      console.error('Error:', error);
      return new Response(
        JSON.stringify({ error: '服务器错误: ' + error.message }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }
  },
};