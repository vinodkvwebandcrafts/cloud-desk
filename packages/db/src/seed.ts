import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORY_TRANSLATIONS: Record<string, Record<string, { name: string; description: string }>> = {
  "Getting Started": {
    es: { name: "Primeros Pasos", description: "Configura tu cuenta, tu espacio de trabajo y comienza a usar CloudDesk en minutos." },
    fr: { name: "Prise en Main", description: "Configurez votre compte, votre espace de travail et commencez à utiliser CloudDesk en quelques minutes." },
    de: { name: "Erste Schritte", description: "Richten Sie Ihr Konto ein, konfigurieren Sie Ihren Arbeitsbereich und starten Sie mit CloudDesk in wenigen Minuten." },
    ja: { name: "はじめに", description: "アカウントの設定、ワークスペースの構成、CloudDeskの使用開始まで数分で完了します。" },
  },
  "Billing & Plans": {
    es: { name: "Facturación y Planes", description: "Gestiona tu suscripción, facturas, mejora o reduce tu plan y métodos de pago." },
    fr: { name: "Facturation et Forfaits", description: "Gérez votre abonnement, vos factures, changez de forfait et vos moyens de paiement." },
    de: { name: "Abrechnung & Tarife", description: "Verwalten Sie Ihr Abonnement, Rechnungen, Tarifwechsel und Zahlungsmethoden." },
    ja: { name: "請求とプラン", description: "サブスクリプション、請求書、プランのアップグレード・ダウングレード、お支払い方法を管理します。" },
  },
  Integrations: {
    es: { name: "Integraciones", description: "Conecta CloudDesk con Slack, Google Workspace, Zapier y más de 50 herramientas que tu equipo ya usa." },
    fr: { name: "Intégrations", description: "Connectez CloudDesk à Slack, Google Workspace, Zapier et plus de 50 outils que votre équipe utilise déjà." },
    de: { name: "Integrationen", description: "Verbinden Sie CloudDesk mit Slack, Google Workspace, Zapier und über 50 weiteren Tools." },
    ja: { name: "インテグレーション", description: "CloudDeskをSlack、Google Workspace、Zapierなど、50以上のツールと接続します。" },
  },
  "Account & Security": {
    es: { name: "Cuenta y Seguridad", description: "Gestiona tu perfil, restablece contraseñas, configura la autenticación de dos factores y controla los permisos." },
    fr: { name: "Compte et Sécurité", description: "Gérez votre profil, réinitialisez vos mots de passe, configurez l'authentification à deux facteurs et les permissions." },
    de: { name: "Konto & Sicherheit", description: "Verwalten Sie Ihr Profil, setzen Sie Passwörter zurück, konfigurieren Sie Zwei-Faktor-Authentifizierung und Zugriffsberechtigungen." },
    ja: { name: "アカウントとセキュリティ", description: "プロフィールの管理、パスワードのリセット、2要素認証の設定、アクセス権限の制御。" },
  },
  "API & Developers": {
    es: { name: "API y Desarrolladores", description: "Accede a la API REST, genera claves API, configura webhooks y crea integraciones personalizadas." },
    fr: { name: "API et Développeurs", description: "Accédez à l'API REST, générez des clés API, configurez les webhooks et créez des intégrations personnalisées." },
    de: { name: "API & Entwickler", description: "Greifen Sie auf die REST-API zu, generieren Sie API-Schlüssel, konfigurieren Sie Webhooks und erstellen Sie eigene Integrationen." },
    ja: { name: "APIと開発者", description: "REST APIへのアクセス、APIキーの生成、Webhookの設定、カスタムインテグレーションの構築。" },
  },
  Troubleshooting: {
    es: { name: "Solución de Problemas", description: "Diagnostica y resuelve problemas comunes con notificaciones, sincronización, rendimiento y conectividad." },
    fr: { name: "Dépannage", description: "Diagnostiquez et résolvez les problèmes courants de notifications, synchronisation, performance et connectivité." },
    de: { name: "Fehlerbehebung", description: "Diagnostizieren und beheben Sie häufige Probleme mit Benachrichtigungen, Synchronisierung, Leistung und Konnektivität." },
    ja: { name: "トラブルシューティング", description: "通知、同期、パフォーマンス、接続の一般的な問題を診断し解決します。" },
  },
};

const ARTICLE_TRANSLATIONS: Record<string, Record<string, { title: string; content: string }>> = {
  // ── Getting Started (12) ──
  "getting-started-with-clouddesk": {
    es: { title: "Primeros pasos con CloudDesk", content: "¡Bienvenido a CloudDesk! Esta guía te lleva paso a paso para crear tu cuenta, configurar tu primer espacio de trabajo y explorar el panel de control." },
    fr: { title: "Démarrer avec CloudDesk", content: "Bienvenue sur CloudDesk ! Ce guide vous accompagne dans la création de votre compte, la configuration de votre espace de travail et la découverte du tableau de bord." },
    de: { title: "Erste Schritte mit CloudDesk", content: "Willkommen bei CloudDesk! Diese Anleitung führt Sie durch die Kontoerstellung, die Einrichtung Ihres Arbeitsbereichs und die Erkundung des Dashboards." },
    ja: { title: "CloudDeskを始めよう", content: "CloudDeskへようこそ！このガイドでは、アカウントの作成、ワークスペースの設定、ダッシュボードの操作方法を説明します。" },
  },
  "configuring-your-first-workspace": {
    es: { title: "Configurando tu primer espacio de trabajo", content: "Aprende a crear y configurar tu primer espacio de trabajo en CloudDesk. Configura canales, personaliza notificaciones y organiza la estructura de tu equipo." },
    fr: { title: "Configurer votre premier espace de travail", content: "Apprenez à créer et configurer votre premier espace de travail dans CloudDesk. Configurez les canaux et organisez votre équipe." },
    de: { title: "Ihren ersten Arbeitsbereich einrichten", content: "Erfahren Sie, wie Sie Ihren ersten Arbeitsbereich in CloudDesk erstellen und konfigurieren. Richten Sie Kanäle ein und organisieren Sie Ihr Team." },
    ja: { title: "最初のワークスペースを設定する", content: "CloudDeskで最初のワークスペースを作成し設定する方法を学びます。チャンネルの設定やチーム構造の整理を行います。" },
  },
  "inviting-team-members": {
    es: { title: "Invitar miembros del equipo", content: "Añade colegas a CloudDesk enviando invitaciones por correo o compartiendo un enlace. Configura roles y permisos para controlar el acceso." },
    fr: { title: "Inviter des membres d'équipe", content: "Ajoutez vos collègues à CloudDesk en envoyant des invitations par email ou en partageant un lien. Configurez les rôles et permissions." },
    de: { title: "Teammitglieder einladen", content: "Fügen Sie Kollegen zu CloudDesk hinzu, indem Sie E-Mail-Einladungen senden oder einen Beitrittslink teilen. Konfigurieren Sie Rollen und Berechtigungen." },
    ja: { title: "チームメンバーを招待する", content: "メール招待や参加リンクの共有で同僚をCloudDeskに追加します。役割と権限を設定してアクセスを制御します。" },
  },
  "setting-up-notifications": {
    es: { title: "Configuración de notificaciones", content: "Configura tus preferencias de notificación para mantenerte informado sin sentirte abrumado. Elige entre notificaciones por correo, push y en la app." },
    fr: { title: "Configuration des notifications", content: "Configurez vos préférences de notification pour rester informé sans être submergé. Choisissez entre email, push et notifications in-app." },
    de: { title: "Benachrichtigungen einrichten", content: "Konfigurieren Sie Ihre Benachrichtigungseinstellungen. Wählen Sie zwischen E-Mail-, Push- und In-App-Benachrichtigungen." },
    ja: { title: "通知の設定", content: "通知設定をカスタマイズして、必要な情報を見逃さずに済みます。メール、プッシュ、アプリ内通知から選択できます。" },
  },
  "understanding-the-dashboard": {
    es: { title: "Entendiendo el panel de control", content: "El panel de CloudDesk ofrece una vista general de la actividad de tu espacio de trabajo. Aprende sobre la navegación lateral, acciones rápidas y el feed de actividad." },
    fr: { title: "Comprendre le tableau de bord", content: "Le tableau de bord CloudDesk offre une vue d'ensemble de l'activité de votre espace de travail. Découvrez la navigation et les actions rapides." },
    de: { title: "Das Dashboard verstehen", content: "Das CloudDesk-Dashboard bietet einen Überblick über die Aktivitäten Ihres Arbeitsbereichs. Erfahren Sie mehr über Navigation und Schnellaktionen." },
    ja: { title: "ダッシュボードを理解する", content: "CloudDeskダッシュボードはワークスペースのアクティビティを一覧できます。サイドバーナビゲーションやクイックアクションについて学びます。" },
  },
  "importing-existing-data": {
    es: { title: "Importar datos existentes", content: "Migra tus datos desde otras plataformas a CloudDesk. Soportamos importación CSV, migración por API e integraciones directas con Zendesk, Intercom y Freshdesk." },
    fr: { title: "Importer des données existantes", content: "Migrez vos données depuis d'autres plateformes vers CloudDesk. Nous supportons l'import CSV, la migration API et les intégrations directes." },
    de: { title: "Bestehende Daten importieren", content: "Migrieren Sie Ihre Daten von anderen Plattformen zu CloudDesk. CSV-Import, API-Migration und direkte Integrationen werden unterstützt." },
    ja: { title: "既存データをインポートする", content: "他のプラットフォームからCloudDeskへデータを移行します。CSVインポート、API移行、直接統合に対応しています。" },
  },
  "keyboard-shortcuts": {
    es: { title: "Atajos de teclado", content: "Acelera tu flujo de trabajo con los atajos de teclado de CloudDesk para navegación, gestión de tickets y acciones comunes." },
    fr: { title: "Raccourcis clavier", content: "Accélérez votre flux de travail avec les raccourcis clavier CloudDesk pour la navigation et la gestion des tickets." },
    de: { title: "Tastenkürzel", content: "Beschleunigen Sie Ihren Workflow mit CloudDesk-Tastenkürzeln für Navigation, Ticketverwaltung und häufige Aktionen." },
    ja: { title: "キーボードショートカット", content: "CloudDeskのキーボードショートカットでナビゲーション、チケット管理、一般的な操作を高速化します。" },
  },
  "mobile-app-setup": {
    es: { title: "Configuración de la app móvil", content: "Descarga y configura la app móvil de CloudDesk para iOS y Android para mantenerte conectado en movimiento." },
    fr: { title: "Configuration de l'app mobile", content: "Téléchargez et configurez l'application mobile CloudDesk pour iOS et Android pour rester connecté en déplacement." },
    de: { title: "Mobile App einrichten", content: "Laden Sie die CloudDesk-App für iOS und Android herunter und konfigurieren Sie sie, um unterwegs verbunden zu bleiben." },
    ja: { title: "モバイルアプリのセットアップ", content: "iOS・Android用CloudDeskモバイルアプリをダウンロードして設定し、外出先でも接続を維持します。" },
  },
  "customizing-your-theme": {
    es: { title: "Personalizar tu tema", content: "Personaliza CloudDesk con temas personalizados, colores y preferencias de diseño para que coincida con tu marca." },
    fr: { title: "Personnaliser votre thème", content: "Personnalisez CloudDesk avec des thèmes, couleurs et préférences de mise en page adaptés à votre marque." },
    de: { title: "Ihr Design anpassen", content: "Personalisieren Sie CloudDesk mit benutzerdefinierten Themes, Farben und Layout-Einstellungen passend zu Ihrer Marke." },
    ja: { title: "テーマをカスタマイズする", content: "カスタムテーマ、カラー、レイアウト設定でCloudDeskをブランドに合わせてパーソナライズします。" },
  },
  "setting-up-email-forwarding": {
    es: { title: "Configurar reenvío de correo", content: "Reenvía correos de soporte directamente a CloudDesk para crear tickets automáticamente a partir de consultas de clientes." },
    fr: { title: "Configurer le transfert d'emails", content: "Transférez les emails de support directement dans CloudDesk pour créer automatiquement des tickets." },
    de: { title: "E-Mail-Weiterleitung einrichten", content: "Leiten Sie Support-E-Mails direkt an CloudDesk weiter, um automatisch Tickets aus Kundenanfragen zu erstellen." },
    ja: { title: "メール転送を設定する", content: "サポートメールをCloudDeskに直接転送して、顧客からの問い合わせから自動的にチケットを作成します。" },
  },
  "creating-custom-views": {
    es: { title: "Crear vistas personalizadas", content: "Crea vistas filtradas personalizadas para organizar tickets por prioridad, estado, asignado o cualquier campo personalizado." },
    fr: { title: "Créer des vues personnalisées", content: "Créez des vues filtrées pour organiser les tickets par priorité, statut, assigné ou champ personnalisé." },
    de: { title: "Benutzerdefinierte Ansichten erstellen", content: "Erstellen Sie gefilterte Ansichten, um Tickets nach Priorität, Status, Beauftragtem oder benutzerdefiniertem Feld zu organisieren." },
    ja: { title: "カスタムビューを作成する", content: "優先度、ステータス、担当者、カスタムフィールドでチケットを整理するフィルター付きビューを作成します。" },
  },
  "quick-start-checklist": {
    es: { title: "Lista de inicio rápido", content: "Una lista paso a paso para asegurarte de que todo está correctamente configurado al empezar con CloudDesk." },
    fr: { title: "Checklist de démarrage rapide", content: "Une checklist étape par étape pour vous assurer que tout est correctement configuré lors du démarrage de CloudDesk." },
    de: { title: "Schnellstart-Checkliste", content: "Eine Schritt-für-Schritt-Checkliste, um sicherzustellen, dass alles korrekt konfiguriert ist." },
    ja: { title: "クイックスタートチェックリスト", content: "CloudDeskのセットアップ時にすべてが正しく設定されていることを確認するためのステップバイステップのチェックリスト。" },
  },
  // ── Billing & Plans (8) ──
  "understanding-your-clouddesk-invoice": {
    es: { title: "Comprendiendo tu factura de CloudDesk", content: "Aprende a leer tu factura mensual, entender los cargos por uso y descargar recibos para tu contabilidad." },
    fr: { title: "Comprendre votre facture CloudDesk", content: "Apprenez à lire votre facture mensuelle, comprendre les frais d'utilisation et télécharger vos reçus comptables." },
    de: { title: "Ihre CloudDesk-Rechnung verstehen", content: "Erfahren Sie, wie Sie Ihre monatliche Rechnung lesen, Nutzungsgebühren verstehen und Belege herunterladen." },
    ja: { title: "CloudDeskの請求書を理解する", content: "月次請求書の読み方、利用料金の理解、経理用の領収書のダウンロード方法を学びます。" },
  },
  "upgrading-your-subscription-plan": {
    es: { title: "Mejorar tu plan de suscripción", content: "¿Listo para desbloquear más funciones? Compara los planes disponibles y mejora tu suscripción. Las mejoras se aplican inmediatamente." },
    fr: { title: "Mettre à niveau votre abonnement", content: "Prêt à débloquer plus de fonctionnalités ? Comparez les forfaits et passez à un niveau supérieur. La mise à niveau prend effet immédiatement." },
    de: { title: "Ihr Abonnement upgraden", content: "Bereit für mehr Funktionen? Vergleichen Sie verfügbare Tarife und upgraden Sie. Upgrades gelten sofort mit anteiliger Abrechnung." },
    ja: { title: "サブスクリプションプランをアップグレードする", content: "より多くの機能をアンロックする準備はできましたか？利用可能なプランを比較してアップグレードしましょう。即座に適用されます。" },
  },
  "billing-cycle-and-proration-explained": {
    es: { title: "Ciclo de facturación y prorrateo explicado", content: "Entiende cómo funcionan los ciclos de facturación, qué pasa al cambiar de plan a mitad de ciclo y cómo se calculan los cargos prorrateados." },
    fr: { title: "Cycle de facturation et prorata expliqués", content: "Comprenez le fonctionnement des cycles de facturation, les changements de forfait en cours de cycle et le calcul du prorata." },
    de: { title: "Abrechnungszyklus und anteilige Berechnung erklärt", content: "Verstehen Sie Abrechnungszyklen, was bei einem Tarifwechsel mitten im Zyklus passiert und wie anteilige Gebühren berechnet werden." },
    ja: { title: "請求サイクルと日割り計算の説明", content: "請求サイクルの仕組み、サイクル途中でのプラン変更時の処理、日割り料金の計算方法を理解します。" },
  },
  "cancelling-your-subscription": {
    es: { title: "Cancelar tu suscripción", content: "Conoce el proceso de cancelación, las políticas de retención de datos y qué pasa con tu espacio de trabajo después de cancelar." },
    fr: { title: "Annuler votre abonnement", content: "Découvrez le processus d'annulation, les politiques de rétention des données et ce qui arrive à votre espace de travail." },
    de: { title: "Ihr Abonnement kündigen", content: "Erfahren Sie mehr über den Kündigungsprozess, Datenaufbewahrungsrichtlinien und was mit Ihrem Arbeitsbereich passiert." },
    ja: { title: "サブスクリプションをキャンセルする", content: "キャンセルプロセス、データ保持ポリシー、キャンセル後のワークスペースについて学びます。" },
  },
  "payment-methods-and-failed-payments": {
    es: { title: "Métodos de pago y pagos fallidos", content: "Añade, actualiza o elimina tarjetas de crédito y cuentas bancarias. Soluciona pagos fallidos y entiende las políticas de reintento." },
    fr: { title: "Moyens de paiement et paiements échoués", content: "Ajoutez, mettez à jour ou supprimez des cartes de crédit et comptes bancaires. Résolvez les paiements échoués." },
    de: { title: "Zahlungsmethoden und fehlgeschlagene Zahlungen", content: "Fügen Sie Kreditkarten und Bankkonten hinzu, aktualisieren oder entfernen Sie sie. Beheben Sie fehlgeschlagene Zahlungen." },
    ja: { title: "支払い方法と支払い失敗", content: "クレジットカードや銀行口座の追加、更新、削除。支払い失敗のトラブルシューティングとリトライポリシーの理解。" },
  },
  "requesting-a-refund": {
    es: { title: "Solicitar un reembolso", content: "Conoce nuestra política de reembolsos, criterios de elegibilidad y cómo enviar una solicitud de reembolso." },
    fr: { title: "Demander un remboursement", content: "Découvrez notre politique de remboursement, les critères d'éligibilité et comment soumettre une demande." },
    de: { title: "Eine Rückerstattung anfordern", content: "Erfahren Sie mehr über unsere Rückerstattungsrichtlinien, Berechtigungskriterien und wie Sie einen Antrag stellen." },
    ja: { title: "返金をリクエストする", content: "返金ポリシー、適格基準、請求ポータルからの返金リクエストの送信方法について学びます。" },
  },
  "enterprise-pricing": {
    es: { title: "Precios empresariales", content: "Información sobre precios empresariales personalizados, descuentos por volumen y cómo contactar a nuestro equipo de ventas." },
    fr: { title: "Tarification entreprise", content: "Informations sur les tarifs entreprise personnalisés, les remises sur volume et comment contacter notre équipe commerciale." },
    de: { title: "Enterprise-Preise", content: "Informationen zu individuellen Enterprise-Preisen, Mengenrabatten und Kontakt zu unserem Vertriebsteam." },
    ja: { title: "エンタープライズ価格", content: "カスタムエンタープライズ価格、ボリュームディスカウント、営業チームへの連絡方法に関する情報。" },
  },
  "tax-and-vat-information": {
    es: { title: "Información sobre impuestos e IVA", content: "Cómo se aplican los impuestos a tu suscripción, cómo añadir un número de IVA y descargar facturas fiscales." },
    fr: { title: "Informations sur les taxes et la TVA", content: "Comment les taxes sont appliquées, ajouter un numéro de TVA et télécharger les factures fiscales." },
    de: { title: "Steuer- und MwSt.-Informationen", content: "Wie Steuern auf Ihr Abonnement angewendet werden, USt-IdNr. hinzufügen und Steuerrechnungen herunterladen." },
    ja: { title: "税金とVAT情報", content: "サブスクリプションへの税金適用方法、VAT IDの追加、税務請求書のダウンロードについて。" },
  },
  // ── Integrations (15) ──
  "connecting-slack-integration": {
    es: { title: "Conectar la integración de Slack", content: "Recibe notificaciones en tiempo real en Slack cuando se crean o actualizan tickets. Autoriza la app CloudDesk y selecciona canales." },
    fr: { title: "Connecter l'intégration Slack", content: "Recevez des notifications en temps réel dans Slack lors de la création ou mise à jour de tickets." },
    de: { title: "Slack-Integration verbinden", content: "Erhalten Sie Echtzeit-Benachrichtigungen in Slack, wenn Tickets erstellt oder aktualisiert werden." },
    ja: { title: "Slackインテグレーションを接続する", content: "チケットの作成や更新時にSlackでリアルタイム通知を受け取ります。CloudDeskアプリを承認し、通知チャンネルを選択します。" },
  },
  "google-workspace-integration": {
    es: { title: "Integración con Google Workspace", content: "Conecta Google Workspace para sincronizar contactos, eventos de calendario y habilitar inicio de sesión único." },
    fr: { title: "Intégration Google Workspace", content: "Connectez Google Workspace pour synchroniser les contacts, les événements de calendrier et activer le SSO." },
    de: { title: "Google Workspace-Integration", content: "Verbinden Sie Google Workspace, um Kontakte und Kalender zu synchronisieren und Single Sign-On zu aktivieren." },
    ja: { title: "Google Workspaceインテグレーション", content: "Google Workspaceを接続して連絡先、カレンダーイベントを同期し、シングルサインオンを有効にします。" },
  },
  "zapier-integration-setup": {
    es: { title: "Configuración de Zapier", content: "Automatiza flujos de trabajo entre CloudDesk y más de 5,000 apps usando Zapier." },
    fr: { title: "Configuration Zapier", content: "Automatisez les flux de travail entre CloudDesk et plus de 5 000 applications avec Zapier." },
    de: { title: "Zapier-Integration einrichten", content: "Automatisieren Sie Workflows zwischen CloudDesk und über 5.000 Apps mit Zapier." },
    ja: { title: "Zapierインテグレーションの設定", content: "Zapierを使用してCloudDeskと5,000以上のアプリ間のワークフローを自動化します。" },
  },
  "microsoft-teams-integration": {
    es: { title: "Integración con Microsoft Teams", content: "Lleva notificaciones y gestión de tickets de CloudDesk directamente a canales y chats de Microsoft Teams." },
    fr: { title: "Intégration Microsoft Teams", content: "Intégrez les notifications et la gestion des tickets CloudDesk dans les canaux et chats Microsoft Teams." },
    de: { title: "Microsoft Teams-Integration", content: "Bringen Sie CloudDesk-Benachrichtigungen und Ticketverwaltung direkt in Microsoft Teams-Kanäle." },
    ja: { title: "Microsoft Teamsインテグレーション", content: "CloudDeskの通知とチケット管理をMicrosoft Teamsのチャンネルとチャットに直接統合します。" },
  },
  "salesforce-crm-sync": {
    es: { title: "Sincronización con Salesforce CRM", content: "Sincroniza datos de clientes entre CloudDesk y Salesforce CRM. Mapea campos y configura la frecuencia de sincronización." },
    fr: { title: "Synchronisation Salesforce CRM", content: "Synchronisez les données clients entre CloudDesk et Salesforce CRM. Mappez les champs et configurez la fréquence." },
    de: { title: "Salesforce CRM-Synchronisation", content: "Synchronisieren Sie Kundendaten zwischen CloudDesk und Salesforce CRM. Ordnen Sie Felder zu und konfigurieren Sie die Häufigkeit." },
    ja: { title: "Salesforce CRM同期", content: "CloudDeskとSalesforce CRM間で顧客データを同期します。フィールドのマッピングと同期頻度を設定します。" },
  },
  "managing-integration-permissions": {
    es: { title: "Gestionar permisos de integraciones", content: "Controla qué integraciones tienen acceso a los datos de tu espacio de trabajo. Revisa permisos y revoca accesos." },
    fr: { title: "Gérer les permissions des intégrations", content: "Contrôlez quelles intégrations ont accès aux données de votre espace de travail. Révisez et révoquez les accès." },
    de: { title: "Integrationsberechtigungen verwalten", content: "Kontrollieren Sie, welche Integrationen Zugriff auf Ihre Workspace-Daten haben. Überprüfen und widerrufen Sie Berechtigungen." },
    ja: { title: "インテグレーション権限を管理する", content: "どのインテグレーションがワークスペースデータにアクセスできるかを制御します。権限の確認とアクセスの取り消し。" },
  },
  "jira-integration": {
    es: { title: "Integración con Jira", content: "Vincula tickets de CloudDesk a issues de Jira para flujos de trabajo fluidos entre desarrollo y soporte." },
    fr: { title: "Intégration Jira", content: "Liez les tickets CloudDesk aux issues Jira pour des flux de travail fluides entre développement et support." },
    de: { title: "Jira-Integration", content: "Verknüpfen Sie CloudDesk-Tickets mit Jira-Issues für nahtlose Workflows zwischen Entwicklung und Support." },
    ja: { title: "Jiraインテグレーション", content: "CloudDeskチケットをJiraイシューにリンクして、開発とサポート間のシームレスなワークフローを実現します。" },
  },
  "hubspot-integration": {
    es: { title: "Integración con HubSpot", content: "Sincroniza datos de clientes con HubSpot CRM y activa flujos de marketing desde interacciones de soporte." },
    fr: { title: "Intégration HubSpot", content: "Synchronisez les données clients avec HubSpot CRM et déclenchez des flux marketing depuis les interactions support." },
    de: { title: "HubSpot-Integration", content: "Synchronisieren Sie Kundendaten mit HubSpot CRM und lösen Sie Marketing-Workflows aus Support-Interaktionen aus." },
    ja: { title: "HubSpotインテグレーション", content: "HubSpot CRMと顧客データを同期し、サポートインタラクションからマーケティングワークフローをトリガーします。" },
  },
  "webhook-configuration": {
    es: { title: "Configuración de Webhooks", content: "Configura webhooks para enviar datos de eventos en tiempo real a tus propios endpoints con secretos de firma." },
    fr: { title: "Configuration des Webhooks", content: "Configurez des webhooks pour envoyer des données d'événements en temps réel à vos endpoints avec des secrets de signature." },
    de: { title: "Webhook-Konfiguration", content: "Richten Sie Webhooks ein, um Echtzeit-Ereignisdaten mit Signaturgeheimnissen an Ihre eigenen Endpoints zu senden." },
    ja: { title: "Webhook設定", content: "署名シークレット付きでリアルタイムイベントデータを独自のエンドポイントにプッシュするWebhookを設定します。" },
  },
  "notion-integration": {
    es: { title: "Integración con Notion", content: "Conecta Notion para crear artículos de base de conocimiento directamente desde conversaciones de CloudDesk." },
    fr: { title: "Intégration Notion", content: "Connectez Notion pour créer des articles de base de connaissances directement depuis les conversations CloudDesk." },
    de: { title: "Notion-Integration", content: "Verbinden Sie Notion, um Wissensdatenbank-Artikel direkt aus CloudDesk-Konversationen zu erstellen." },
    ja: { title: "Notionインテグレーション", content: "Notionを接続してCloudDeskの会話から直接ナレッジベース記事を作成します。" },
  },
  "github-integration": {
    es: { title: "Integración con GitHub", content: "Vincula tickets de soporte a issues y pull requests de GitHub para dar visibilidad a los desarrolladores." },
    fr: { title: "Intégration GitHub", content: "Liez les tickets de support aux issues et pull requests GitHub pour une visibilité développeur." },
    de: { title: "GitHub-Integration", content: "Verknüpfen Sie Support-Tickets mit GitHub-Issues und Pull Requests für Entwickler-Sichtbarkeit." },
    ja: { title: "GitHubインテグレーション", content: "サポートチケットをGitHubのイシューやプルリクエストにリンクして開発者の可視性を向上させます。" },
  },
  "shopify-integration": {
    es: { title: "Integración con Shopify", content: "Ve el historial de pedidos del cliente y datos de Shopify directamente en los tickets de soporte de CloudDesk." },
    fr: { title: "Intégration Shopify", content: "Consultez l'historique des commandes et les données Shopify directement dans les tickets de support CloudDesk." },
    de: { title: "Shopify-Integration", content: "Sehen Sie Kundenbestellverlauf und Shopify-Daten direkt in CloudDesk-Support-Tickets." },
    ja: { title: "Shopifyインテグレーション", content: "CloudDeskサポートチケット内で顧客の注文履歴とShopifyデータを直接表示します。" },
  },
  "stripe-integration": {
    es: { title: "Integración con Stripe", content: "Accede a datos de pagos y suscripciones de Stripe junto a las conversaciones de soporte al cliente." },
    fr: { title: "Intégration Stripe", content: "Accédez aux données de paiement et d'abonnement Stripe en parallèle des conversations de support." },
    de: { title: "Stripe-Integration", content: "Greifen Sie auf Stripe-Zahlungs- und Abonnementdaten neben Kundensupport-Konversationen zu." },
    ja: { title: "Stripeインテグレーション", content: "カスタマーサポートの会話と一緒にStripeの支払いとサブスクリプションデータにアクセスします。" },
  },
  "intercom-migration": {
    es: { title: "Migración desde Intercom", content: "Guía paso a paso para migrar tus conversaciones y contactos de Intercom a CloudDesk." },
    fr: { title: "Migration depuis Intercom", content: "Guide étape par étape pour migrer vos conversations et contacts d'Intercom vers CloudDesk." },
    de: { title: "Migration von Intercom", content: "Schritt-für-Schritt-Anleitung zur Migration Ihrer Konversationen und Kontakte von Intercom zu CloudDesk." },
    ja: { title: "Intercomからの移行", content: "IntercomからCloudDeskへの会話と連絡先の移行に関するステップバイステップガイド。" },
  },
  "custom-integration-builder": {
    es: { title: "Constructor de integraciones personalizadas", content: "Crea tus propias integraciones usando el SDK de CloudDesk y publícalas en el marketplace." },
    fr: { title: "Constructeur d'intégrations personnalisées", content: "Créez vos propres intégrations avec le SDK CloudDesk et publiez-les sur le marketplace." },
    de: { title: "Benutzerdefinierter Integrations-Builder", content: "Erstellen Sie eigene Integrationen mit dem CloudDesk Integration SDK und veröffentlichen Sie sie im Marketplace." },
    ja: { title: "カスタムインテグレーションビルダー", content: "CloudDesk Integration SDKを使用して独自のインテグレーションを構築し、マーケットプレイスに公開します。" },
  },
  // ── Account & Security (10) ──
  "how-to-reset-your-password": {
    es: { title: "Cómo restablecer tu contraseña", content: "Haz clic en 'Olvidé mi contraseña' en la página de inicio de sesión e ingresa tu correo. Recibirás un enlace de restablecimiento válido por 24 horas." },
    fr: { title: "Comment réinitialiser votre mot de passe", content: "Cliquez sur 'Mot de passe oublié' sur la page de connexion et entrez votre email. Vous recevrez un lien valide 24 heures." },
    de: { title: "So setzen Sie Ihr Passwort zurück", content: "Klicken Sie auf 'Passwort vergessen' auf der Anmeldeseite und geben Sie Ihre E-Mail ein. Sie erhalten einen 24 Stunden gültigen Link." },
    ja: { title: "パスワードをリセットする方法", content: "ログインページで「パスワードを忘れた」をクリックしてメールアドレスを入力します。24時間有効なリセットリンクが届きます。" },
  },
  "setting-up-two-factor-authentication": {
    es: { title: "Configurar la autenticación de dos factores", content: "Protege tu cuenta con una capa adicional de seguridad. Guía paso a paso para activar 2FA con una app de autenticación o SMS." },
    fr: { title: "Configurer l'authentification à deux facteurs", content: "Protégez votre compte avec une couche de sécurité supplémentaire. Guide étape par étape pour activer la 2FA." },
    de: { title: "Zwei-Faktor-Authentifizierung einrichten", content: "Schützen Sie Ihr Konto mit einer zusätzlichen Sicherheitsebene. Schritt-für-Schritt-Anleitung zur Aktivierung von 2FA." },
    ja: { title: "2要素認証を設定する", content: "追加のセキュリティレイヤーでアカウントを保護します。認証アプリまたはSMSでの2FA有効化手順。" },
  },
  "managing-team-member-roles": {
    es: { title: "Gestionar roles de miembros del equipo", content: "Asigna roles como Admin, Agente y Visor para controlar el acceso y las modificaciones en tu espacio de trabajo." },
    fr: { title: "Gérer les rôles des membres", content: "Attribuez des rôles comme Admin, Agent et Lecteur pour contrôler les accès et modifications dans votre espace." },
    de: { title: "Teamrollen verwalten", content: "Weisen Sie Rollen wie Admin, Agent und Betrachter zu, um den Zugriff in Ihrem Workspace zu steuern." },
    ja: { title: "チームメンバーの役割を管理する", content: "管理者、エージェント、閲覧者などの役割を割り当てて、ワークスペースでのアクセスと変更を制御します。" },
  },
  "troubleshooting-login-issues": {
    es: { title: "Solucionar problemas de inicio de sesión", content: "¿No puedes iniciar sesión? Verifica Caps Lock, limpia la caché del navegador, comprueba la sesión SSO y sigue nuestra guía." },
    fr: { title: "Résoudre les problèmes de connexion", content: "Impossible de se connecter ? Vérifiez le Caps Lock, videz le cache du navigateur, vérifiez la session SSO." },
    de: { title: "Anmeldeprobleme beheben", content: "Können Sie sich nicht anmelden? Überprüfen Sie die Feststelltaste, löschen Sie den Browser-Cache, überprüfen Sie die SSO-Sitzung." },
    ja: { title: "ログイン問題のトラブルシューティング", content: "ログインできませんか？CapsLockの確認、ブラウザキャッシュのクリア、SSOセッションの確認を試してください。" },
  },
  "updating-your-profile-information": {
    es: { title: "Actualizar tu información de perfil", content: "Cambia tu nombre de visualización, avatar, zona horaria y preferencias de notificación desde la configuración de perfil." },
    fr: { title: "Mettre à jour vos informations de profil", content: "Modifiez votre nom d'affichage, avatar, fuseau horaire et préférences de notification depuis les paramètres." },
    de: { title: "Profilinformationen aktualisieren", content: "Ändern Sie Ihren Anzeigenamen, Avatar, Zeitzone und Benachrichtigungseinstellungen in den Profileinstellungen." },
    ja: { title: "プロフィール情報を更新する", content: "プロフィール設定から表示名、アバター、タイムゾーン、通知設定を変更します。" },
  },
  "single-sign-on-sso-setup": {
    es: { title: "Configuración de inicio de sesión único (SSO)", content: "Los clientes empresariales pueden configurar SSO usando SAML 2.0. Ingresa la URL de metadatos de tu proveedor de identidad." },
    fr: { title: "Configuration du SSO (Single Sign-On)", content: "Les clients entreprise peuvent configurer le SSO avec SAML 2.0. Entrez l'URL des métadonnées de votre fournisseur d'identité." },
    de: { title: "Single Sign-On (SSO) einrichten", content: "Enterprise-Kunden können SSO mit SAML 2.0 konfigurieren. Geben Sie die Metadaten-URL Ihres Identity Providers ein." },
    ja: { title: "シングルサインオン（SSO）の設定", content: "エンタープライズのお客様はSAML 2.0を使用してSSOを設定できます。IDプロバイダーのメタデータURLを入力します。" },
  },
  "session-management": {
    es: { title: "Gestión de sesiones", content: "Ve sesiones activas, revoca acceso en dispositivos perdidos y configura políticas de tiempo de espera de sesión." },
    fr: { title: "Gestion des sessions", content: "Consultez les sessions actives, révoquez l'accès sur les appareils perdus et configurez les délais d'expiration." },
    de: { title: "Sitzungsverwaltung", content: "Zeigen Sie aktive Sitzungen an, widerrufen Sie den Zugriff auf verlorenen Geräten und konfigurieren Sie Timeout-Richtlinien." },
    ja: { title: "セッション管理", content: "アクティブなセッションの表示、紛失デバイスでのアクセス取り消し、セッションタイムアウトポリシーの設定。" },
  },
  "audit-logs": {
    es: { title: "Registros de auditoría", content: "Revisa un registro detallado de todas las acciones realizadas en tu espacio de trabajo para cumplimiento y monitoreo de seguridad." },
    fr: { title: "Journaux d'audit", content: "Consultez un journal détaillé de toutes les actions effectuées dans votre espace de travail pour la conformité." },
    de: { title: "Audit-Protokolle", content: "Überprüfen Sie ein detailliertes Protokoll aller Aktionen in Ihrem Workspace für Compliance und Sicherheitsüberwachung." },
    ja: { title: "監査ログ", content: "コンプライアンスとセキュリティ監視のために、ワークスペースで実行されたすべてのアクションの詳細なログを確認します。" },
  },
  "data-export-and-deletion": {
    es: { title: "Exportación y eliminación de datos", content: "Exporta los datos de tu espacio de trabajo o solicita la eliminación de tu cuenta en cumplimiento con GDPR." },
    fr: { title: "Exportation et suppression des données", content: "Exportez les données de votre espace de travail ou demandez la suppression de votre compte conformément au RGPD." },
    de: { title: "Datenexport und -löschung", content: "Exportieren Sie Ihre Workspace-Daten oder fordern Sie die Kontolöschung gemäß DSGVO an." },
    ja: { title: "データのエクスポートと削除", content: "GDPRに準拠してワークスペースデータのエクスポートまたはアカウント削除をリクエストします。" },
  },
  "ip-allowlisting": {
    es: { title: "Lista blanca de IP", content: "Restringe el acceso al espacio de trabajo a direcciones IP específicas para mayor seguridad." },
    fr: { title: "Liste blanche d'IP", content: "Restreignez l'accès à l'espace de travail à des adresses IP spécifiques pour une sécurité renforcée." },
    de: { title: "IP-Allowlisting", content: "Beschränken Sie den Workspace-Zugriff auf bestimmte IP-Adressen für erhöhte Sicherheit." },
    ja: { title: "IP許可リスト", content: "セキュリティ強化のため、特定のIPアドレスにワークスペースアクセスを制限します。" },
  },
  // ── API & Developers (18) ──
  "getting-started-with-the-clouddesk-api": {
    es: { title: "Primeros pasos con la API de CloudDesk", content: "Una introducción completa a la API REST: autenticación, endpoints, límites de velocidad y tu primera llamada API con ejemplos de código." },
    fr: { title: "Démarrer avec l'API CloudDesk", content: "Une introduction complète à l'API REST : authentification, endpoints, limites de débit et votre premier appel API avec des exemples." },
    de: { title: "Erste Schritte mit der CloudDesk API", content: "Eine vollständige Einführung in die REST-API: Authentifizierung, Endpunkte, Rate Limits und Ihr erster API-Aufruf mit Codebeispielen." },
    ja: { title: "CloudDesk APIを始めよう", content: "REST APIの完全な入門—認証、エンドポイント、レート制限、コード例付きの初めてのAPIコール。" },
  },
  "generating-api-keys": {
    es: { title: "Generar claves API", content: "Genera claves API desde Configuración > API > Claves. Las claves pueden tener permisos específicos y rotarse sin tiempo de inactividad." },
    fr: { title: "Générer des clés API", content: "Générez des clés API depuis Paramètres > API > Clés. Les clés peuvent être limitées et renouvelées sans interruption." },
    de: { title: "API-Schlüssel generieren", content: "Generieren Sie API-Schlüssel unter Einstellungen > API > Schlüssel. Schlüssel können mit Berechtigungen versehen und ohne Ausfallzeit rotiert werden." },
    ja: { title: "APIキーを生成する", content: "設定 > API > キーからAPIキーを生成します。キーは特定の権限にスコープを設定でき、ダウンタイムなしでローテーションできます。" },
  },
  "webhook-configuration-guide": {
    es: { title: "Guía de configuración de Webhooks", content: "Configura webhooks para enviar datos de eventos en tiempo real a tus endpoints. Configura URLs, selecciona eventos y gestiona secretos." },
    fr: { title: "Guide de configuration des Webhooks", content: "Configurez des webhooks pour envoyer des données d'événements en temps réel. Configurez les URLs et gérez les secrets." },
    de: { title: "Webhook-Konfigurationsanleitung", content: "Richten Sie Webhooks ein, um Echtzeit-Ereignisdaten an Ihre Endpoints zu senden. Konfigurieren Sie URLs und Signaturgeheimnisse." },
    ja: { title: "Webhook設定ガイド", content: "リアルタイムイベントデータをエンドポイントにプッシュするWebhookを設定します。URL、イベント、署名シークレットを管理します。" },
  },
  "oauth-app-setup": {
    es: { title: "Configuración de app OAuth", content: "Registra una aplicación OAuth para CloudDesk, configura URIs de redirección e implementa el flujo de código de autorización." },
    fr: { title: "Configuration d'une app OAuth", content: "Enregistrez une application OAuth pour CloudDesk, configurez les URIs de redirection et implémentez le flux d'autorisation." },
    de: { title: "OAuth-App einrichten", content: "Registrieren Sie eine OAuth-Anwendung für CloudDesk, konfigurieren Sie Redirect-URIs und implementieren Sie den Authorization Code Flow." },
    ja: { title: "OAuthアプリのセットアップ", content: "CloudDesk用のOAuthアプリケーションを登録し、リダイレクトURIを設定し、認証コードフローを実装します。" },
  },
  "api-rate-limits-and-best-practices": {
    es: { title: "Límites de velocidad y mejores prácticas de la API", content: "La API de CloudDesk permite 1,000 solicitudes por minuto por clave. Implementa backoff exponencial y paginación." },
    fr: { title: "Limites de débit et bonnes pratiques API", content: "L'API CloudDesk autorise 1 000 requêtes par minute par clé. Implémentez le backoff exponentiel et la pagination." },
    de: { title: "API-Rate-Limits und Best Practices", content: "Die CloudDesk-API erlaubt 1.000 Anfragen pro Minute pro Schlüssel. Implementieren Sie exponentiellen Backoff und Paginierung." },
    ja: { title: "APIレート制限とベストプラクティス", content: "CloudDesk APIはキーごとに1分あたり1,000リクエストを許可します。指数バックオフとページネーションを実装してください。" },
  },
  "sdk-libraries-and-code-samples": {
    es: { title: "Bibliotecas SDK y ejemplos de código", content: "Bibliotecas SDK oficiales para Node.js, Python, Ruby y Go. Incluye ejemplos de código y plantillas de inicio rápido." },
    fr: { title: "Bibliothèques SDK et exemples de code", content: "Bibliothèques SDK officielles pour Node.js, Python, Ruby et Go. Inclut des exemples de code et des modèles de démarrage." },
    de: { title: "SDK-Bibliotheken und Codebeispiele", content: "Offizielle SDK-Bibliotheken für Node.js, Python, Ruby und Go. Enthält Codebeispiele und Schnellstart-Vorlagen." },
    ja: { title: "SDKライブラリとコードサンプル", content: "Node.js、Python、Ruby、Go用の公式SDKライブラリ。一般的な操作のコードサンプルとクイックスタートテンプレートを含みます。" },
  },
  "ticket-api-endpoints": {
    es: { title: "Endpoints de la API de tickets", content: "Crea, lee, actualiza y elimina tickets programáticamente usando la API de Tickets." },
    fr: { title: "Endpoints de l'API Tickets", content: "Créez, lisez, mettez à jour et supprimez des tickets par programmation via l'API Tickets." },
    de: { title: "Ticket-API-Endpunkte", content: "Erstellen, lesen, aktualisieren und löschen Sie Tickets programmatisch über die Tickets-API." },
    ja: { title: "チケットAPIエンドポイント", content: "Tickets APIを使用してチケットのプログラムによる作成、読み取り、更新、削除を行います。" },
  },
  "customer-api-endpoints": {
    es: { title: "Endpoints de la API de clientes", content: "Gestiona perfiles de clientes, fusiona duplicados y sincroniza datos de contacto a través de la API de Clientes." },
    fr: { title: "Endpoints de l'API Clients", content: "Gérez les profils clients, fusionnez les doublons et synchronisez les contacts via l'API Clients." },
    de: { title: "Kunden-API-Endpunkte", content: "Verwalten Sie Kundenprofile, führen Sie Duplikate zusammen und synchronisieren Sie Kontaktdaten über die Kunden-API." },
    ja: { title: "顧客APIエンドポイント", content: "Customers APIで顧客プロフィールの管理、重複のマージ、連絡先データの同期を行います。" },
  },
  "conversation-api": {
    es: { title: "API de conversaciones", content: "Envía y recibe mensajes, gestiona hilos de conversación y maneja adjuntos a través de la API." },
    fr: { title: "API Conversations", content: "Envoyez et recevez des messages, gérez les fils de conversation et les pièces jointes via l'API." },
    de: { title: "Konversations-API", content: "Senden und empfangen Sie Nachrichten, verwalten Sie Konversationsthreads und Anhänge über die API." },
    ja: { title: "会話API", content: "APIを通じてメッセージの送受信、会話スレッドの管理、添付ファイルの処理を行います。" },
  },
  "bulk-operations-api": {
    es: { title: "API de operaciones masivas", content: "Realiza operaciones por lotes en tickets, clientes y etiquetas para una gestión eficiente de datos." },
    fr: { title: "API Opérations en masse", content: "Effectuez des opérations par lots sur les tickets, clients et tags pour une gestion efficace des données." },
    de: { title: "Massenoperationen-API", content: "Führen Sie Batch-Operationen für Tickets, Kunden und Tags für effizientes Datenmanagement durch." },
    ja: { title: "一括操作API", content: "効率的なデータ管理のために、チケット、顧客、タグに対するバッチ操作を実行します。" },
  },
  "pagination-and-filtering": {
    es: { title: "Paginación y filtrado", content: "Navega grandes conjuntos de datos con paginación basada en cursor y filtros de consulta potentes." },
    fr: { title: "Pagination et filtrage", content: "Naviguez dans de grands ensembles de données avec la pagination par curseur et des filtres de requête puissants." },
    de: { title: "Paginierung und Filterung", content: "Navigieren Sie große Datensätze mit Cursor-basierter Paginierung und leistungsfähigen Abfragefiltern." },
    ja: { title: "ページネーションとフィルタリング", content: "カーソルベースのページネーションと強力なクエリフィルターで大規模なデータセットをナビゲートします。" },
  },
  "error-handling-guide": {
    es: { title: "Guía de manejo de errores", content: "Entiende los códigos de error de la API, formatos de respuesta e implementa un manejo robusto de errores." },
    fr: { title: "Guide de gestion des erreurs", content: "Comprenez les codes d'erreur API, les formats de réponse et implémentez une gestion d'erreurs robuste." },
    de: { title: "Fehlerbehandlungsanleitung", content: "Verstehen Sie API-Fehlercodes, Antwortformate und implementieren Sie eine robuste Fehlerbehandlung." },
    ja: { title: "エラーハンドリングガイド", content: "APIエラーコード、レスポンス形式を理解し、堅牢なエラーハンドリングを実装します。" },
  },
  "api-versioning": {
    es: { title: "Versionado de la API", content: "Cómo funcionan las versiones de la API, guías de migración entre versiones y cronogramas de deprecación." },
    fr: { title: "Versionnage de l'API", content: "Comment fonctionnent les versions de l'API, guides de migration entre versions et calendriers de dépréciation." },
    de: { title: "API-Versionierung", content: "Wie API-Versionen funktionieren, Migrationsleitfäden zwischen Versionen und Deprecation-Zeitpläne." },
    ja: { title: "APIバージョニング", content: "APIバージョンの仕組み、バージョン間の移行ガイド、廃止予定のタイムライン。" },
  },
  "sandbox-environment": {
    es: { title: "Entorno sandbox", content: "Usa el entorno sandbox para probar tus integraciones de forma segura sin afectar datos de producción." },
    fr: { title: "Environnement sandbox", content: "Utilisez l'environnement sandbox pour tester vos intégrations en toute sécurité sans affecter les données de production." },
    de: { title: "Sandbox-Umgebung", content: "Nutzen Sie die Sandbox-Umgebung, um Ihre Integrationen sicher zu testen, ohne Produktionsdaten zu beeinflussen." },
    ja: { title: "サンドボックス環境", content: "本番データに影響を与えずにインテグレーションを安全にテストするためのサンドボックス環境を使用します。" },
  },
  "custom-fields-api": {
    es: { title: "API de campos personalizados", content: "Crea y gestiona campos personalizados en tickets y clientes a través de la API." },
    fr: { title: "API Champs personnalisés", content: "Créez et gérez des champs personnalisés sur les tickets et clients via l'API." },
    de: { title: "Benutzerdefinierte Felder API", content: "Erstellen und verwalten Sie benutzerdefinierte Felder für Tickets und Kunden über die API." },
    ja: { title: "カスタムフィールドAPI", content: "APIを通じてチケットと顧客のカスタムフィールドを作成・管理します。" },
  },
  "reporting-api": {
    es: { title: "API de informes", content: "Extrae datos de análisis e informes de CloudDesk para dashboards personalizados e inteligencia de negocio." },
    fr: { title: "API Rapports", content: "Récupérez les données d'analyse et de rapport de CloudDesk pour des tableaux de bord personnalisés." },
    de: { title: "Reporting-API", content: "Ziehen Sie Analyse- und Berichtsdaten aus CloudDesk für benutzerdefinierte Dashboards und Business Intelligence." },
    ja: { title: "レポートAPI", content: "カスタムダッシュボードとビジネスインテリジェンスのためにCloudDeskから分析・レポートデータを取得します。" },
  },
  "real-time-events-websocket": {
    es: { title: "Eventos en tiempo real (WebSocket)", content: "Suscríbete a eventos en tiempo real usando conexiones WebSocket para actualizaciones de tickets en vivo." },
    fr: { title: "Événements en temps réel (WebSocket)", content: "Abonnez-vous aux événements en temps réel via WebSocket pour les mises à jour de tickets en direct." },
    de: { title: "Echtzeit-Events (WebSocket)", content: "Abonnieren Sie Echtzeit-Events über WebSocket-Verbindungen für Live-Ticket-Updates und Benachrichtigungen." },
    ja: { title: "リアルタイムイベント（WebSocket）", content: "WebSocket接続を使用してリアルタイムイベントをサブスクライブし、ライブチケット更新と通知を受け取ります。" },
  },
  "api-changelog": {
    es: { title: "Registro de cambios de la API", content: "Una lista cronológica de cambios en la API, nuevos endpoints y funciones deprecadas." },
    fr: { title: "Journal des modifications de l'API", content: "Une liste chronologique des changements de l'API, nouveaux endpoints et fonctionnalités dépréciées." },
    de: { title: "API-Änderungsprotokoll", content: "Eine chronologische Liste von API-Änderungen, neuen Endpunkten und veralteten Funktionen." },
    ja: { title: "API変更履歴", content: "APIの変更、新しいエンドポイント、廃止された機能の時系列リスト。" },
  },
  // ── Troubleshooting (9) ──
  "notifications-not-arriving": {
    es: { title: "Las notificaciones no llegan", content: "Las notificaciones pueden retrasarse por limitación del proveedor de correo. Verifica Configuración > Notificaciones y revisa carpetas de spam." },
    fr: { title: "Les notifications n'arrivent pas", content: "Les notifications peuvent être retardées par le fournisseur de messagerie. Vérifiez Paramètres > Notifications et le dossier spam." },
    de: { title: "Benachrichtigungen kommen nicht an", content: "Benachrichtigungen können durch E-Mail-Provider-Throttling verzögert werden. Überprüfen Sie Einstellungen > Benachrichtigungen und Spam-Ordner." },
    ja: { title: "通知が届かない", content: "メールプロバイダーの制限により通知が遅れる場合があります。設定 > 通知で配信状態を確認し、スパムフォルダーを確認してください。" },
  },
  "data-sync-issues": {
    es: { title: "Problemas de sincronización de datos", content: "Resuelve problemas de sincronización entre CloudDesk e integraciones conectadas. Verifica el estado de la API y reautoriza conexiones." },
    fr: { title: "Problèmes de synchronisation des données", content: "Résolvez les problèmes de synchronisation entre CloudDesk et les intégrations connectées. Vérifiez l'état de l'API." },
    de: { title: "Datensynchronisierungsprobleme", content: "Beheben Sie Synchronisierungsprobleme zwischen CloudDesk und verbundenen Integrationen. Überprüfen Sie den API-Status." },
    ja: { title: "データ同期の問題", content: "CloudDeskと接続されたインテグレーション間の同期問題を解決します。APIステータスを確認し、接続を再認証します。" },
  },
  "slow-performance-troubleshooting": {
    es: { title: "Solucionar rendimiento lento", content: "Diagnostica y arregla tiempos de carga lentos. Verifica tu conexión a internet, limpia caché del navegador y verifica el estado del sistema." },
    fr: { title: "Résoudre les problèmes de lenteur", content: "Diagnostiquez et corrigez les temps de chargement lents. Vérifiez votre connexion, videz le cache et vérifiez l'état du système." },
    de: { title: "Langsame Leistung beheben", content: "Diagnostizieren Sie langsame Ladezeiten. Überprüfen Sie Ihre Internetverbindung, löschen Sie den Browser-Cache und prüfen Sie den Systemstatus." },
    ja: { title: "パフォーマンス低下のトラブルシューティング", content: "読み込み時間の遅さを診断して修正します。インターネット接続の確認、ブラウザキャッシュのクリア、システムステータスの確認。" },
  },
  "browser-compatibility-issues": {
    es: { title: "Problemas de compatibilidad del navegador", content: "CloudDesk soporta las dos últimas versiones de Chrome, Firefox, Safari y Edge. Actualiza tu navegador y desactiva extensiones conflictivas." },
    fr: { title: "Problèmes de compatibilité navigateur", content: "CloudDesk supporte les deux dernières versions de Chrome, Firefox, Safari et Edge. Mettez à jour et désactivez les extensions." },
    de: { title: "Browser-Kompatibilitätsprobleme", content: "CloudDesk unterstützt die letzten zwei Versionen von Chrome, Firefox, Safari und Edge. Aktualisieren Sie Ihren Browser." },
    ja: { title: "ブラウザ互換性の問題", content: "CloudDeskはChrome、Firefox、Safari、Edgeの最新2バージョンをサポートしています。ブラウザを更新し、競合する拡張機能を無効にしてください。" },
  },
  "mobile-app-troubleshooting": {
    es: { title: "Solucionar problemas de la app móvil", content: "Arregla problemas comunes de la app móvil incluyendo bloqueos, fallos de notificaciones push y problemas de inicio de sesión." },
    fr: { title: "Dépannage de l'app mobile", content: "Résolvez les problèmes courants de l'app mobile : plantages, échecs de notifications push et problèmes de connexion." },
    de: { title: "Mobile App-Fehlerbehebung", content: "Beheben Sie häufige Probleme der mobilen App wie Abstürze, Push-Benachrichtigungsfehler und Anmeldeprobleme." },
    ja: { title: "モバイルアプリのトラブルシューティング", content: "クラッシュ、プッシュ通知の失敗、ログイン問題など、モバイルアプリの一般的な問題を修正します。" },
  },
  "clearing-cache-and-cookies": {
    es: { title: "Limpiar caché y cookies", content: "Instrucciones paso a paso para limpiar caché y cookies del navegador en Chrome, Firefox, Safari y Edge." },
    fr: { title: "Vider le cache et les cookies", content: "Instructions étape par étape pour vider le cache et les cookies dans Chrome, Firefox, Safari et Edge." },
    de: { title: "Cache und Cookies löschen", content: "Schritt-für-Schritt-Anleitung zum Löschen von Browser-Cache und Cookies in Chrome, Firefox, Safari und Edge." },
    ja: { title: "キャッシュとCookieをクリアする", content: "Chrome、Firefox、Safari、Edgeでブラウザキャッシュとクッキーをクリアするためのステップバイステップの手順。" },
  },
  "email-delivery-problems": {
    es: { title: "Problemas de entrega de correo", content: "Soluciona problemas de envío y recepción de correo, configuración SPF/DKIM y capacidad de entrega." },
    fr: { title: "Problèmes de livraison d'emails", content: "Résolvez les problèmes d'envoi et de réception d'emails, la configuration SPF/DKIM et la délivrabilité." },
    de: { title: "E-Mail-Zustellungsprobleme", content: "Beheben Sie Probleme beim Senden und Empfangen von E-Mails, SPF/DKIM-Konfiguration und Zustellbarkeit." },
    ja: { title: "メール配信の問題", content: "メールの送受信問題、SPF/DKIM設定、配信可能性のトラブルシューティング。" },
  },
  "file-upload-errors": {
    es: { title: "Errores de carga de archivos", content: "Resuelve problemas con adjuntos de archivos incluyendo límites de tamaño, restricciones de formato y fallos de carga." },
    fr: { title: "Erreurs d'upload de fichiers", content: "Résolvez les problèmes de pièces jointes : limites de taille, restrictions de format et échecs d'upload." },
    de: { title: "Datei-Upload-Fehler", content: "Beheben Sie Probleme mit Dateianhängen wie Größenbeschränkungen, Formateinschränkungen und Upload-Fehler." },
    ja: { title: "ファイルアップロードエラー", content: "サイズ制限、フォーマット制限、アップロード失敗など、ファイル添付の問題を解決します。" },
  },
  "search-not-working": {
    es: { title: "La búsqueda no funciona", content: "Arregla retrasos en la indexación de búsqueda, resultados vacíos y problemas de filtros en la búsqueda de CloudDesk." },
    fr: { title: "La recherche ne fonctionne pas", content: "Corrigez les délais d'indexation, les résultats vides et les problèmes de filtres dans la recherche CloudDesk." },
    de: { title: "Suche funktioniert nicht", content: "Beheben Sie Suchindexierungsverzögerungen, leere Ergebnisse und Filterprobleme in der CloudDesk-Suche." },
    ja: { title: "検索が機能しない", content: "CloudDesk検索でのインデックス遅延、空の結果、フィルターの問題を修正します。" },
  },
};

const VIDEO_TRANSLATIONS: Record<string, Record<string, string>> = {
  "Quick Setup Guide": {
    es: "Guía de Configuración Rápida", fr: "Guide d'Installation Rapide", de: "Schnellstartanleitung", ja: "クイックセットアップガイド",
  },
  "Connecting Your First Integration": {
    es: "Conectando tu Primera Integración", fr: "Connecter Votre Première Intégration", de: "Ihre Erste Integration Verbinden", ja: "最初のインテグレーションを接続する",
  },
  "Managing Team Permissions": {
    es: "Gestión de Permisos del Equipo", fr: "Gérer les Permissions d'Équipe", de: "Team-Berechtigungen Verwalten", ja: "チーム権限の管理",
  },
  "Using the API: Developer Walkthrough": {
    es: "Uso de la API: Guía para Desarrolladores", fr: "Utiliser l'API : Guide Développeur", de: "API Verwenden: Entwickler-Leitfaden", ja: "APIの使い方：開発者向けウォークスルー",
  },
};

async function main() {
  await prisma.articleTranslation.deleteMany();
  await prisma.categoryTranslation.deleteMany();
  await prisma.videoTranslation.deleteMany();
  await prisma.article.deleteMany();
  await prisma.category.deleteMany();
  await prisma.video.deleteMany();
  await prisma.searchLog.deleteMany();

  const gs = await prisma.category.create({ data: { name: "Getting Started", description: "Set up your account, configure your workspace, and get up and running with CloudDesk in minutes.", icon: "Rocket" } });
  const bi = await prisma.category.create({ data: { name: "Billing & Plans", description: "Manage your subscription, understand invoices, upgrade or downgrade plans, and payment methods.", icon: "CreditCard" } });
  const ig = await prisma.category.create({ data: { name: "Integrations", description: "Connect CloudDesk with Slack, Google Workspace, Zapier, and 50+ other tools your team already uses.", icon: "Plug" } });
  const sc = await prisma.category.create({ data: { name: "Account & Security", description: "Manage your profile, reset passwords, configure two-factor authentication, and control access permissions.", icon: "Shield" } });
  const ap = await prisma.category.create({ data: { name: "API & Developers", description: "Access the REST API, generate API keys, configure webhooks, and build custom integrations with CloudDesk.", icon: "Code" } });
  const ts = await prisma.category.create({ data: { name: "Troubleshooting", description: "Diagnose and resolve common issues with notifications, syncing, performance, and connectivity problems.", icon: "Wrench" } });

  for (const cat of [gs, bi, ig, sc, ap, ts]) {
    const tr = CATEGORY_TRANSLATIONS[cat.name];
    if (!tr) continue;
    for (const [locale, d] of Object.entries(tr))
      await prisma.categoryTranslation.create({ data: { categoryId: cat.id, locale, name: d.name, description: d.description } });
  }

  const articles = [
    { title: "Getting Started with CloudDesk", slug: "getting-started-with-clouddesk", content: "Welcome to CloudDesk! This comprehensive guide walks you through creating your account, setting up your first workspace, and exploring the dashboard.", categoryId: gs.id, readTime: 5 },
    { title: "Configuring Your First Workspace", slug: "configuring-your-first-workspace", content: "Learn how to create and configure your first workspace in CloudDesk. Set up channels, customize notification preferences, and organize your team structure.", categoryId: gs.id, readTime: 4 },
    { title: "Inviting Team Members", slug: "inviting-team-members", content: "Add your colleagues to CloudDesk by sending email invitations or sharing a join link. Configure roles and permissions to control access.", categoryId: gs.id, readTime: 3 },
    { title: "Setting Up Notifications", slug: "setting-up-notifications", content: "Configure your notification preferences to stay informed without being overwhelmed. Choose between email, push, and in-app notifications.", categoryId: gs.id, readTime: 3 },
    { title: "Understanding the Dashboard", slug: "understanding-the-dashboard", content: "The CloudDesk dashboard provides an overview of your workspace activity. Learn about sidebar navigation, quick actions, and activity feeds.", categoryId: gs.id, readTime: 4 },
    { title: "Importing Existing Data", slug: "importing-existing-data", content: "Migrate your existing data from other platforms into CloudDesk. We support CSV imports, API-based migration, and direct integrations.", categoryId: gs.id, readTime: 6 },
    { title: "Keyboard Shortcuts", slug: "keyboard-shortcuts", content: "Speed up your workflow with CloudDesk keyboard shortcuts for navigation, ticket management, and common actions.", categoryId: gs.id, readTime: 2 },
    { title: "Mobile App Setup", slug: "mobile-app-setup", content: "Download and configure the CloudDesk mobile app for iOS and Android to stay connected on the go.", categoryId: gs.id, readTime: 3 },
    { title: "Customizing Your Theme", slug: "customizing-your-theme", content: "Personalize CloudDesk with custom themes, colors, and layout preferences to match your brand.", categoryId: gs.id, readTime: 2 },
    { title: "Setting Up Email Forwarding", slug: "setting-up-email-forwarding", content: "Forward support emails directly into CloudDesk to automatically create tickets from customer inquiries.", categoryId: gs.id, readTime: 4 },
    { title: "Creating Custom Views", slug: "creating-custom-views", content: "Build custom filtered views to organize tickets by priority, status, assignee, or any custom field.", categoryId: gs.id, readTime: 3 },
    { title: "Quick Start Checklist", slug: "quick-start-checklist", content: "A step-by-step checklist to ensure you have everything configured correctly when setting up CloudDesk.", categoryId: gs.id, readTime: 2 },
    { title: "Understanding Your CloudDesk Invoice", slug: "understanding-your-clouddesk-invoice", content: "Learn how to read your monthly invoice, understand usage charges, and download receipts for your accounting records.", categoryId: bi.id, readTime: 4, isFeatured: true },
    { title: "Upgrading Your Subscription Plan", slug: "upgrading-your-subscription-plan", content: "Ready to unlock more features? Compare available tiers and upgrade your plan. Upgrades take effect immediately.", categoryId: bi.id, readTime: 3 },
    { title: "Billing Cycle and Proration Explained", slug: "billing-cycle-and-proration-explained", content: "Understand how billing cycles work, what happens when you change plans mid-cycle, and how prorated charges are calculated.", categoryId: bi.id, readTime: 4 },
    { title: "Cancelling Your Subscription", slug: "cancelling-your-subscription", content: "Learn about the cancellation process, data retention policies, and what happens to your workspace after cancellation.", categoryId: bi.id, readTime: 3 },
    { title: "Payment Methods and Failed Payments", slug: "payment-methods-and-failed-payments", content: "Add, update, or remove credit cards and bank accounts. Troubleshoot failed payments and understand retry policies.", categoryId: bi.id, readTime: 3 },
    { title: "Requesting a Refund", slug: "requesting-a-refund", content: "Learn about our refund policy, eligibility criteria, and how to submit a refund request through the billing portal.", categoryId: bi.id, readTime: 3 },
    { title: "Enterprise Pricing", slug: "enterprise-pricing", content: "Information about custom enterprise pricing, volume discounts, and how to contact our sales team.", categoryId: bi.id, readTime: 2 },
    { title: "Tax and VAT Information", slug: "tax-and-vat-information", content: "How taxes are applied to your subscription, adding a VAT ID, and downloading tax invoices.", categoryId: bi.id, readTime: 3 },
    { title: "Connecting Slack Integration", slug: "connecting-slack-integration", content: "Receive real-time notifications in Slack when tickets are created or updated.", categoryId: ig.id, readTime: 3 },
    { title: "Google Workspace Integration", slug: "google-workspace-integration", content: "Connect Google Workspace to sync contacts, calendar events, and enable single sign-on.", categoryId: ig.id, readTime: 5 },
    { title: "Zapier Integration Setup", slug: "zapier-integration-setup", content: "Automate workflows between CloudDesk and 5,000+ apps using Zapier.", categoryId: ig.id, readTime: 5 },
    { title: "Microsoft Teams Integration", slug: "microsoft-teams-integration", content: "Bring CloudDesk notifications and ticket management directly into Microsoft Teams.", categoryId: ig.id, readTime: 4 },
    { title: "Salesforce CRM Sync", slug: "salesforce-crm-sync", content: "Sync customer data between CloudDesk and Salesforce CRM.", categoryId: ig.id, readTime: 6 },
    { title: "Managing Integration Permissions", slug: "managing-integration-permissions", content: "Control which integrations have access to your workspace data.", categoryId: ig.id, readTime: 4 },
    { title: "Jira Integration", slug: "jira-integration", content: "Link CloudDesk tickets to Jira issues for seamless development-to-support workflows.", categoryId: ig.id, readTime: 4 },
    { title: "HubSpot Integration", slug: "hubspot-integration", content: "Sync customer data with HubSpot CRM and trigger marketing workflows from support interactions.", categoryId: ig.id, readTime: 4 },
    { title: "Webhook Configuration", slug: "webhook-configuration", content: "Set up webhooks to push real-time event data to your own endpoints with signing secrets.", categoryId: ig.id, readTime: 4 },
    { title: "Notion Integration", slug: "notion-integration", content: "Connect Notion to create knowledge base articles directly from CloudDesk conversations.", categoryId: ig.id, readTime: 3 },
    { title: "GitHub Integration", slug: "github-integration", content: "Link support tickets to GitHub issues and pull requests for developer visibility.", categoryId: ig.id, readTime: 3 },
    { title: "Shopify Integration", slug: "shopify-integration", content: "View customer order history and Shopify data directly within CloudDesk support tickets.", categoryId: ig.id, readTime: 4 },
    { title: "Stripe Integration", slug: "stripe-integration", content: "Access Stripe payment and subscription data alongside customer support conversations.", categoryId: ig.id, readTime: 3 },
    { title: "Intercom Migration", slug: "intercom-migration", content: "Step-by-step guide to migrating your conversations and contacts from Intercom to CloudDesk.", categoryId: ig.id, readTime: 8 },
    { title: "Custom Integration Builder", slug: "custom-integration-builder", content: "Build your own integrations using the CloudDesk Integration SDK and publish them to the marketplace.", categoryId: ig.id, readTime: 10 },
    { title: "How to Reset Your Password", slug: "how-to-reset-your-password", content: "Click 'Forgot Password' on the login page and enter your email. You'll receive a reset link valid for 24 hours.", categoryId: sc.id, readTime: 2 },
    { title: "Setting Up Two-Factor Authentication", slug: "setting-up-two-factor-authentication", content: "Protect your account with an extra layer of security. Step-by-step guide to enabling 2FA.", categoryId: sc.id, readTime: 6, isFeatured: true },
    { title: "Managing Team Member Roles", slug: "managing-team-member-roles", content: "Assign roles like Admin, Agent, and Viewer to control access in your workspace.", categoryId: sc.id, readTime: 4 },
    { title: "Troubleshooting Login Issues", slug: "troubleshooting-login-issues", content: "Can't log in? Check Caps Lock, clear browser cache, verify SSO session.", categoryId: sc.id, readTime: 3 },
    { title: "Updating Your Profile Information", slug: "updating-your-profile-information", content: "Change your display name, avatar, timezone, and notification preferences.", categoryId: sc.id, readTime: 2 },
    { title: "Single Sign-On (SSO) Setup", slug: "single-sign-on-sso-setup", content: "Enterprise customers can configure SSO using SAML 2.0.", categoryId: sc.id, readTime: 8 },
    { title: "Session Management", slug: "session-management", content: "View active sessions, revoke access on lost devices, and configure session timeout policies.", categoryId: sc.id, readTime: 3 },
    { title: "Audit Logs", slug: "audit-logs", content: "Review a detailed log of all actions taken in your workspace for compliance and security monitoring.", categoryId: sc.id, readTime: 4 },
    { title: "Data Export and Deletion", slug: "data-export-and-deletion", content: "Export your workspace data or request account deletion in compliance with GDPR.", categoryId: sc.id, readTime: 5 },
    { title: "IP Allowlisting", slug: "ip-allowlisting", content: "Restrict workspace access to specific IP addresses for enhanced security.", categoryId: sc.id, readTime: 3 },
    { title: "Getting Started with the CloudDesk API", slug: "getting-started-with-the-clouddesk-api", content: "A complete introduction to the REST API — authentication, endpoints, rate limits, and your first API call with code examples.", categoryId: ap.id, readTime: 10, isFeatured: true },
    { title: "Generating API Keys", slug: "generating-api-keys", content: "Generate API keys from Settings > API > Keys. Keys can be scoped to specific permissions and rotated without downtime.", categoryId: ap.id, readTime: 3 },
    { title: "Webhook Configuration Guide", slug: "webhook-configuration-guide", content: "Set up webhooks to push real-time event data to your endpoints.", categoryId: ap.id, readTime: 5 },
    { title: "OAuth App Setup", slug: "oauth-app-setup", content: "Register an OAuth application for CloudDesk, configure redirect URIs, and implement the authorization code flow.", categoryId: ap.id, readTime: 8 },
    { title: "API Rate Limits and Best Practices", slug: "api-rate-limits-and-best-practices", content: "The CloudDesk API allows 1,000 requests per minute per key. Implement exponential backoff and pagination.", categoryId: ap.id, readTime: 5 },
    { title: "SDK Libraries and Code Samples", slug: "sdk-libraries-and-code-samples", content: "Official SDK libraries for Node.js, Python, Ruby, and Go with code samples.", categoryId: ap.id, readTime: 6 },
    { title: "Ticket API Endpoints", slug: "ticket-api-endpoints", content: "Create, read, update, and delete tickets programmatically using the Tickets API.", categoryId: ap.id, readTime: 7 },
    { title: "Customer API Endpoints", slug: "customer-api-endpoints", content: "Manage customer profiles, merge duplicates, and sync contact data via the Customers API.", categoryId: ap.id, readTime: 6 },
    { title: "Conversation API", slug: "conversation-api", content: "Send and receive messages, manage conversation threads, and handle attachments via the API.", categoryId: ap.id, readTime: 7 },
    { title: "Bulk Operations API", slug: "bulk-operations-api", content: "Perform batch operations on tickets, customers, and tags for efficient data management.", categoryId: ap.id, readTime: 5 },
    { title: "Pagination and Filtering", slug: "pagination-and-filtering", content: "Navigate large data sets with cursor-based pagination and powerful query filters.", categoryId: ap.id, readTime: 4 },
    { title: "Error Handling Guide", slug: "error-handling-guide", content: "Understand API error codes, response formats, and implement robust error handling.", categoryId: ap.id, readTime: 4 },
    { title: "API Versioning", slug: "api-versioning", content: "How API versions work, migration guides between versions, and deprecation timelines.", categoryId: ap.id, readTime: 3 },
    { title: "Sandbox Environment", slug: "sandbox-environment", content: "Use the sandbox environment to test your integrations safely without affecting production data.", categoryId: ap.id, readTime: 3 },
    { title: "Custom Fields API", slug: "custom-fields-api", content: "Create and manage custom fields on tickets and customers through the API.", categoryId: ap.id, readTime: 4 },
    { title: "Reporting API", slug: "reporting-api", content: "Pull analytics and reporting data from CloudDesk for custom dashboards.", categoryId: ap.id, readTime: 5 },
    { title: "Real-time Events (WebSocket)", slug: "real-time-events-websocket", content: "Subscribe to real-time events using WebSocket connections for live ticket updates.", categoryId: ap.id, readTime: 7 },
    { title: "API Changelog", slug: "api-changelog", content: "A chronological list of API changes, new endpoints, and deprecated features.", categoryId: ap.id, readTime: 2 },
    { title: "Notifications Not Arriving", slug: "notifications-not-arriving", content: "Notifications may be delayed due to email provider throttling. Check Settings > Notifications.", categoryId: ts.id, readTime: 4 },
    { title: "Data Sync Issues", slug: "data-sync-issues", content: "Resolve synchronization problems between CloudDesk and connected integrations.", categoryId: ts.id, readTime: 5 },
    { title: "Slow Performance Troubleshooting", slug: "slow-performance-troubleshooting", content: "Diagnose and fix slow loading times. Check internet, clear cache, disable extensions.", categoryId: ts.id, readTime: 4 },
    { title: "Browser Compatibility Issues", slug: "browser-compatibility-issues", content: "CloudDesk supports the latest two versions of Chrome, Firefox, Safari, and Edge.", categoryId: ts.id, readTime: 3 },
    { title: "Mobile App Troubleshooting", slug: "mobile-app-troubleshooting", content: "Fix common mobile app issues including crashes, push notification failures, and login problems.", categoryId: ts.id, readTime: 4 },
    { title: "Clearing Cache and Cookies", slug: "clearing-cache-and-cookies", content: "Step-by-step instructions for clearing browser cache and cookies across Chrome, Firefox, Safari, and Edge.", categoryId: ts.id, readTime: 3 },
    { title: "Email Delivery Problems", slug: "email-delivery-problems", content: "Troubleshoot email sending and receiving issues, SPF/DKIM configuration, and deliverability.", categoryId: ts.id, readTime: 5 },
    { title: "File Upload Errors", slug: "file-upload-errors", content: "Resolve issues with file attachments including size limits, format restrictions, and upload failures.", categoryId: ts.id, readTime: 3 },
    { title: "Search Not Working", slug: "search-not-working", content: "Fix search indexing delays, empty results, and filter issues in CloudDesk search.", categoryId: ts.id, readTime: 3 },
  ];

  await prisma.article.createMany({ data: articles.map(a => ({ ...a, isFeatured: (a as any).isFeatured ?? false })) });

  const allArticles = await prisma.article.findMany();
  for (const article of allArticles) {
    const tr = ARTICLE_TRANSLATIONS[article.slug];
    if (!tr) continue;
    for (const [locale, d] of Object.entries(tr))
      await prisma.articleTranslation.create({ data: { articleId: article.id, locale, title: d.title, content: d.content } });
  }

  const videos = [
    { title: "Quick Setup Guide", duration: "3:42", thumbnail: "/thumbnails/quick-setup.jpg", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    { title: "Connecting Your First Integration", duration: "5:18", thumbnail: "/thumbnails/integrations.jpg", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    { title: "Managing Team Permissions", duration: "4:55", thumbnail: "/thumbnails/permissions.jpg", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    { title: "Using the API: Developer Walkthrough", duration: "8:30", thumbnail: "/thumbnails/api-walkthrough.jpg", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  ];
  await prisma.video.createMany({ data: videos });

  const allVideos = await prisma.video.findMany();
  for (const video of allVideos) {
    const tr = VIDEO_TRANSLATIONS[video.title];
    if (!tr) continue;
    for (const [locale, title] of Object.entries(tr))
      await prisma.videoTranslation.create({ data: { videoId: video.id, locale, title } });
  }

  const c = { cat: await prisma.category.count(), art: await prisma.article.count(), vid: await prisma.video.count(), catTr: await prisma.categoryTranslation.count(), artTr: await prisma.articleTranslation.count(), vidTr: await prisma.videoTranslation.count() };
  console.log(`Seed complete: ${c.cat} categories, ${c.art} articles, ${c.vid} videos, ${c.catTr} category translations, ${c.artTr} article translations, ${c.vidTr} video translations`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
